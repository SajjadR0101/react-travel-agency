import React, { useCallback, useContext, useEffect, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import TextByIcon from "../../../components/TextByIcon/TextByIcon";
import Svg from "../../../components/Svg/Svg";
import Overlay from "../../../components/Overlay/Overlay";
import GridSystem from "../../../components/GridSystem/GridSystem";
import Input from "../../../components/Form/Input";
import PasswordInput from "../../../components/Form/PasswordInput";
import { requiredValidator, minValidator, maxValidator, timeValidator, dateValidator, numberValidator } from "../../../validator/rules";
import useForm from "../../../hooks/useForm";
import useFetch from "../../../hooks/useFetch";
import useUploader from "../../../hooks/useUploader";
import ToastContext from "../../../context/ToastContext";
import ImageCover from "../../../components/ImageCover/ImageCover";
import FileInput from "../../../components/Form/FileInput";
import CmsButton from "./CmsButton";

export default function EditFlightModal({ isShow = false, onClose = () => {}, onConfirm = () => {}, flight = {} }) {
    const [formState, onInput] = useForm(["flight-name", "flight-price", "from", "to", "depart-date", "return-date", "depart-time", "return-time", "fly-time", "gate", "capacity"]);
    const isCoverChanged = useRef(false);

    useEffect(() => {
        isCoverChanged.current = false;
    }, [flight]);

    const { showToast } = useContext(ToastContext);

    const [cover, setCoverHandler] = useUploader(
        () => (isCoverChanged.current = true),
        () => showToast("warning", "Type of profile only png or jpeg."),
        flight?.cover
    );

    const [editFlightAction, isFetching] = useFetch({
        url: "https://node-travel-agency.liara.run/api/flights/",
        method: "PUT",
        contentType: true,
        successCallback: () => {
            showToast("success", "Flight data changed successfully.");
            onClose();
            onConfirm();
        },
        errorCallback: () => {
            showToast("error", "Something wrong, please try latter.");
            onClose();
        },
    });

    const editFlightHandler = useCallback((event) => {
        event.preventDefault();

        if (formState.isFormValid) {
            const { "flight-name": flightName, "flight-price": price, from, to, "depart-date": departDate, "return-date": returnDate, "depart-time": departTime, "return-time": returnTime, "fly-time": flyTime, gate, capacity } = formState.form;

            editFlightAction({ flightName: flightName.value, price: +price.value, ...(isCoverChanged.current && { cover }), fromCity: from.value, toCity: to.value, departDate: departDate.value, returnDate: returnDate.value, departTime: departTime.value, returnTime: returnTime.value, flyTime: +flyTime.value, gate: gate.value, capacity: +capacity.value }, [flight?.id]);
        } else {
            showToast("warning", "Please enter valid data.");
        }
    }, [formState.isFormValid, cover])

    const onChangeCover = useCallback((event) => {
        setCoverHandler(event, 600, 600);
    }, []);

    return createPortal(
        <>
            <div className={`bg-white shadow-box rounded-2xl fixed top-20 left-0 right-0 m-auto z-20 w-[80%] transition-all ${isShow ? "opacity-100 visible" : "opacity-0 invisible"}`}>
                <div className="p-6 flex justify-between items-center text-slate-500 font-MontserratMedium border-b border-gray-200">
                    <TextByIcon text="Edit Flight Info" className="text-blue-500 flex items-center gap-x-2" iconID="question-mark-circle" iconClasses="w-5 h-5" />
                    <button onClick={onClose}>
                        <Svg iconID="x-mark" className="w-6 h-6" />
                    </button>
                </div>
                <div className="flex items-start justify-between gap-x-6 p-6">
                    <form className="w-full">
                        <GridSystem parentClaasName="grid grid-cols-4 gap-6">
                            <Input type="text" init={flight?.flightName} id="flight-name" label="Flight Name" wrapperClassName="col-span-2" errorMessage='The minimum of flight name is 5 character' validations={useMemo(() => [requiredValidator(), minValidator(5), maxValidator(50)], [])} onInput={onInput} />
                            <Input type="text" init={String(flight?.price)} customProps={useMemo(() => ({ inputmode: "numeric", pattern: "[0-9]+" }), [])} id="flight-price" label="Price" wrapperClassName="col-span-1" errorMessage='InValid price' validations={useMemo(() => [requiredValidator(), numberValidator()], [])} onInput={onInput} />
                            <Input type="text" init={flight?.fromCity} id="from" label="From" wrapperClassName="col-span-1" errorMessage='minimum is 3 character' validations={useMemo(() => [requiredValidator(), minValidator(3)], [])} onInput={onInput} />
                            <Input type="text" init={flight?.toCity} id="to" label="To" wrapperClassName="col-span-1" errorMessage='minimum is 3 character' validations={useMemo(() => [requiredValidator(), minValidator(3)], [])} onInput={onInput} />
                            <Input type="text" init={flight?.departDate} id="depart-date" label="Depart Date" wrapperClassName="col-span-1" validations={useMemo(() => [requiredValidator(), dateValidator()], [])} onInput={onInput} />
                            <Input type="text" init={flight?.returnDate} id="return-date" label="Return Date" wrapperClassName="col-span-1" validations={useMemo(() => [requiredValidator(), dateValidator()], [])} onInput={onInput} />
                            <Input type="text" init={flight?.departTime} id="depart-time" label="Depart Time" wrapperClassName="col-span-1" validations={useMemo(() => [requiredValidator(), timeValidator()], [])} onInput={onInput} />
                            <Input type="text" init={flight?.returnTime} id="return-time" label="Return Time" wrapperClassName="col-span-1" validations={useMemo(() => [requiredValidator(), timeValidator()], [])} onInput={onInput} />
                            <Input type="text" init={String(flight?.flyTime)} id="fly-time" label="Fly Time" wrapperClassName="col-span-1" errorMessage='InValid ( example: 65 min )' validations={useMemo(() => [requiredValidator(), numberValidator()], [])} onInput={onInput} />
                            <Input type="text" init={flight?.gate} id="gate" label="Gate" wrapperClassName="col-span-1" errorMessage='minimum is 3 character' validations={useMemo(() => [requiredValidator(), minValidator(2)], [])} onInput={onInput} />
                            <Input type="text" init={String(flight?.capacity)} customProps={useMemo(() => ({ inputmode: "numeric", pattern: "[0-9]+" }), [])} id="capacity" label="Capacity" wrapperClassName="col-span-1" errorMessage='InValid capacity' validations={useMemo(() => [requiredValidator(), numberValidator()], [])} onInput={onInput} />
                            <CmsButton className='max-w-[200px] row-start-4' isLoading={isFetching} onClick={editFlightHandler}>Edit Flight</CmsButton>
                        </GridSystem>
                    </form>
                    <div className="flex flex-col gap-y-4 items-center w-1/4 flex-shrink-0">
                        <ImageCover src={cover} wrapperClassName="w-full h-[215px] rounded-lg overflow-hidden border-4 border-blue-500" />
                        <FileInput className="cms-btn" id="edit-flight-cover" title="Change Flight Cover" onChange={onChangeCover} uploaded={!!cover && isCoverChanged.current} />
                    </div>
                </div>
            </div>
            <Overlay isShow={isShow} onClose={onClose} />
        </>,
        document.body
    );
}
