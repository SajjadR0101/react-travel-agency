import React, { useCallback, useContext, useMemo } from "react"
import GridSystem from "../../../components/GridSystem/GridSystem";
import Input from "../../../components/Form/Input";
import FileInput from "../../../components/Form/FileInput";
import { requiredValidator, minValidator, maxValidator, numberValidator, dateValidator, timeValidator } from "../../../validator/rules";
import useForm from "../../../hooks/useForm";
import ToastContext from "../../../context/ToastContext";
import Select from "../../../components/Form/Select";
import Loading from "../../../components/Loading/Loading";
import useDataFetch from "../../../hooks/useDataFetch";
import useUploader from "../../../hooks/useUploader";
import useFetch from "../../../hooks/useFetch";
import DateInput from "../../../components/Form/DateInput";
import TimeInput from "../../../components/Form/TimeInput";
import CmsButton from './CmsButton'

export default function AddNewHotel({ onAddHotel }) {
    const [formState, onInput, clearAllInput] = useForm(["hotel-name", "hotel-price", "check-in-date", "check-out-date", "check-in-time", "check-out-time", "rooms", "stars", "company", "trip-type"]);

    const [companies, , companiesPendding] = useDataFetch("https://node-travel-agency.liara.run/api/companies");
    const [tripTypes, , tripTypesPendding] = useDataFetch("https://node-travel-agency.liara.run/api/triptypes");

    const { showToast } = useContext(ToastContext);

    const [cover, setCoverHandler, makeEmptyCover] = useUploader(undefined, () => showToast("warning", "Type of profile only png or jpeg."));

    const [addHotelAction, isFetching] = useFetch({
        url: "https://node-travel-agency.liara.run/api/hotels/",
        method: "POST",
        contentType: true,
        successCallback: () => {
            showToast("success", "Hotel add to database successfully.");
            onAddHotel();
            clearAllInput();
            makeEmptyCover();
        },
        errorCallback: () => {
            showToast("error", "Something wrong, please try latter.");
        },
    });

    const addHotelHandler = useCallback((event) => {
        event.preventDefault();

        if (formState.isFormValid && cover) {
            const { "hotel-name": hotelName, "hotel-price": price, "check-in-date": checkInDate, "check-out-date": checkOutDate, "check-in-time": checkInTime, "check-out-time": checkOutTime, rooms, stars, company, "trip-type": tripType } = formState.form;

            addHotelAction({ hotelName: hotelName.value, price: +price.value, cover, score: parseFloat(`${stars.value - 1}.${(Math.random() * 10).toFixed(1)}`), checkInDate: checkInDate.value, checkOutDate: checkOutDate.value, checkInTime: checkInTime.value, checkOutTime: checkOutTime.value, rooms: +rooms.value, tripTypeID: tripType.value, companyID: company.value });
        } else {
            showToast("warning", "Please enter valid data.");
        }
    }, [formState.isFormValid, cover]);

    const onChangeCover = useCallback((event) => {
        setCoverHandler(event, 600, 600);
    }, []);

    return (
        <div>
            <h3 className="font-TradeGothic font-bold text-3xl text-slate-600 mb-6">Add New Hotel</h3>
            <form>
                <GridSystem parentClaasName="grid grid-cols-6 gap-6">
                    <Input type="text" id="hotel-name" label="Hotel Name" wrapperClassName="col-span-2" errorMessage='The minimum of hotel name is 5 character' validations={useMemo(() => [requiredValidator(), minValidator(5), maxValidator(50)], [])} onInput={onInput} />
                    <Input type="text" customProps={useMemo(() => ({ inputmode: "numeric", pattern: "[0-9]+" }), [])} id="hotel-price" label="Price" errorMessage='InValid price' wrapperClassName="col-span-1" validations={useMemo(() => [requiredValidator(), numberValidator()], [])} onInput={onInput} />
                    <Input type="text" customProps={useMemo(() => ({ inputmode: "numeric", pattern: "[0-9]+" }), [])} id="rooms" label="Rooms Count" errorMessage='InValid rooms count' wrapperClassName="col-span-1" validations={useMemo(() => [requiredValidator(), numberValidator()], [])} onInput={onInput} />
                    <DateInput type="text" id="check-in-date" buttonIconID="date" label="Check In Date" wrapperClassName="col-span-2" validations={useMemo(() => [requiredValidator(), dateValidator()], [])} onInput={onInput} />
                    <DateInput type="text" id="check-out-date" buttonIconID="date" label="Check Out Date" wrapperClassName="col-span-2" validations={useMemo(() => [requiredValidator(), dateValidator()], [])} onInput={onInput} />
                    <TimeInput type="text" id="check-in-time" buttonIconID="clock" label="Check In Time" wrapperClassName="col-span-2" validations={useMemo(() => [requiredValidator(), timeValidator()], [])} onInput={onInput} />
                    <TimeInput type="text" id="check-out-time" buttonIconID="clock" label="Check Out Time" wrapperClassName="col-span-2" validations={useMemo(() => [requiredValidator(), timeValidator()], [])} onInput={onInput} />
                    <Select
                        label="Star"
                        id="stars"
                        options={useMemo(() => [
                            { title: "1 star", value: 1 },
                            { title: "2 star", value: 2 },
                            { title: "3 star", value: 3 },
                            { title: "4 star", value: 4 },
                            { title: "5 star", value: 5 },
                        ], [])}
                        onSelect={onInput}
                    />
                    <div className="z-10">
                        <Loading isPendding={companiesPendding}>
                            <Select label="Company" id="company" options={useMemo(() => companies.map((company) => ({ title: company.name, value: company.id })), [companies])} onSelect={onInput} />
                        </Loading>
                    </div>
                    <div className="z-10 col-span-2">
                        <Loading isPendding={tripTypesPendding}>
                            <Select label="Trip Type" id="trip-type" options={useMemo(() => tripTypes.map((type) => ({ title: type.type, value: type.id })), [tripTypes])} onSelect={onInput} />
                        </Loading>
                    </div>
                    <div className="col-span-2">
                        <FileInput className="cms-btn h-14" id="flight-cover" title="Upload Hotel Cover" onChange={onChangeCover} uploaded={!!cover} />
                    </div>
                    <CmsButton className="max-w-[200px] row-start-4" isLoading={isFetching} onClick={addHotelHandler}>Add Hotel</CmsButton>
                </GridSystem>
            </form>
        </div>
    );
}
