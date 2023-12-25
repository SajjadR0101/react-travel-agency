import React, { useCallback, useContext, useMemo } from "react";
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
import CmsButton from "./CmsButton";

export default function AddNewFlight({ onAddFlight }) {
    const [formState, onInput, clearAllInput] = useForm(["flight-name", "flight-price", "from", "to", "depart-date", "return-date", "depart-time", "return-time", "fly-time", "gate", "capacity", "stars", "company", "trip-type"]);

    const [companies, , companiesPendding] = useDataFetch("https://node-travel-agency.liara.run/api/companies");
    const [tripTypes, , tripTypesPendding] = useDataFetch("https://node-travel-agency.liara.run/api/triptypes");

    const { showToast } = useContext(ToastContext);

    const [cover, setCoverHandler, makeEmptyCover] = useUploader(undefined, () => showToast("warning", "Type of profile only png or jpeg."));

    const [addFlightAction, isFetching] = useFetch({
        url: "https://node-travel-agency.liara.run/api/flights/",
        method: "POST",
        contentType: true,
        successCallback: () => {
            showToast("success", "Flight add to database successfully.");
            onAddFlight();
            clearAllInput();
            makeEmptyCover();
        },
        errorCallback: () => {
            showToast("error", "Something wrong, please try latter.");
        },
    });

    const addFlightHandler = useCallback((event) => {
        event.preventDefault();

        if (formState.isFormValid && cover) {
            const { "flight-name": flightName, "flight-price": price, from, to, "depart-date": departDate, "return-date": returnDate, "depart-time": departTime, "return-time": returnTime, "fly-time": flyTime, gate, capacity, stars, company, "trip-type": tripType } = formState.form;

            addFlightAction({ flightName: flightName.value, price: +price.value, cover, from: from.value, to: to.value, departDate: departDate.value, returnDate: returnDate.value, departTime: departTime.value, returnTime: returnTime.value, flyTime: +flyTime.value, gate: gate.value, capacity: +capacity.value, tripTypeID: tripType.value, companyID: company.value, score: parseFloat(`${stars.value - 1}.${(Math.random() * 10).toFixed(1)}`) });
        } else {
            showToast("warning", "Please enter valid data.");
        }
    }, [formState.isFormValid, cover]);

    const onChangeCover = useCallback((event) => {
        setCoverHandler(event, 600, 600);
    }, []);

    return (
        <div>
            <h3 className="font-TradeGothic font-bold text-3xl text-slate-600 mb-6">Add New Flight</h3>
            <form>
                <GridSystem parentClaasName="grid grid-cols-6 gap-6">
                    <Input type="text" id="flight-name" label="Flight Name" wrapperClassName="col-span-2" errorMessage='The minimum of flight name is 5 character' validations={useMemo(() => [requiredValidator(), minValidator(5), maxValidator(50)], [])} onInput={onInput} />
                    <Input type="text" customProps={useMemo(() => ({ inputmode: "numeric", pattern: "[0-9]+" }), [])} id="flight-price" label="Price" wrapperClassName="col-span-1" errorMessage='InValid price' validations={useMemo(() => [requiredValidator(), numberValidator()], [])} onInput={onInput} />
                    <Input type="text" id="from" label="From" wrapperClassName="col-span-1" errorMessage='minimum is 3 character' validations={useMemo(() => [requiredValidator(), minValidator(3)], [])} onInput={onInput} />
                    <Input type="text" id="to" label="To" wrapperClassName="col-span-1" errorMessage='minimum is 3 character' validations={useMemo(() => [requiredValidator(), minValidator(3)], [])} onInput={onInput} />
                    <Input type="text" customProps={useMemo(() => ({ inputmode: "numeric", pattern: "[0-9]+" }), [])} id="capacity" label="Capacity" errorMessage='InValid capacity' wrapperClassName="col-span-1" validations={useMemo(() => [requiredValidator(), numberValidator()], [])} onInput={onInput} />
                    <DateInput type="text" id="depart-date" buttonIconID="date" label="Depart Date" wrapperClassName="col-span-2" validations={useMemo(() => [requiredValidator(), dateValidator()], [])} onInput={onInput} />
                    <DateInput type="text" id="return-date" buttonIconID="date" label="Return Date" wrapperClassName="col-span-2" validations={useMemo(() => [requiredValidator(), dateValidator()], [])} onInput={onInput} />
                    <TimeInput type="text" id="depart-time" buttonIconID="clock" label="Depart Time" wrapperClassName="col-span-2" validations={useMemo(() => [requiredValidator(), timeValidator()], [])} onInput={onInput} />
                    <TimeInput type="text" id="return-time" buttonIconID="clock" label="Return Time" wrapperClassName="col-span-2" validations={useMemo(() => [requiredValidator(), timeValidator()], [])} onInput={onInput} />
                    <Input type="text" id="fly-time" label="Fly Time" wrapperClassName="col-span-1" errorMessage='InValid ( example: 65 min )' validations={useMemo(() => [requiredValidator(), numberValidator()], [])} onInput={onInput} />
                    <Input type="text" id="gate" label="Gate" wrapperClassName="col-span-1" errorMessage='minimum is 3 character'  validations={useMemo(() => [requiredValidator(), minValidator(2)], [])} onInput={onInput} />
                    <Select
                        label="Star"
                        id="stars"
                        options={useMemo(() => ([
                            { title: "1 star", value: 1 },
                            { title: "2 star", value: 2 },
                            { title: "3 star", value: 3 },
                            { title: "4 star", value: 4 },
                            { title: "5 star", value: 5 },
                        ]), [])}
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
                        <FileInput className="cms-btn h-14" id="flight-cover" title="Upload Flight Cover" onChange={onChangeCover} uploaded={!!cover} />
                    </div>
                    <CmsButton className='max-w-[200px] row-start-5' isLoading={isFetching} onClick={addFlightHandler}>Add Flight</CmsButton>
                </GridSystem>
            </form>
        </div>
    );
}
