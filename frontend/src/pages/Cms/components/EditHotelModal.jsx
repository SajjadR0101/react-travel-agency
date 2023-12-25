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

export default function EditHotelModal({ isShow = false, onClose = () => {}, onConfirm = () => {}, hotel = {} }) {
    const [formState, onInput] = useForm(["hotel-name", "hotel-price", "check-in-date", "check-out-date", "check-in-time", "check-out-time", "rooms"]);
    const isCoverChanged = useRef(false);

    useEffect(() => {
        isCoverChanged.current = false;
    }, [hotel]);

    const { showToast } = useContext(ToastContext);

    const [cover, setCoverHandler] = useUploader(
        () => (isCoverChanged.current = true),
        () => showToast("warning", "Type of profile only png or jpeg."),
        hotel?.cover
    );

    const [editHotelAction, isFetching] = useFetch({
        url: "https://node-travel-agency.liara.run/api/hotels/",
        method: "PUT",
        contentType: true,
        successCallback: () => {
            showToast("success", "Hotel data changed successfully.");
            onClose();
            onConfirm();
        },
        errorCallback: () => {
            showToast("error", "Something wrong, please try latter.");
            onClose();
        },
    });

    const editHotelHandler = useCallback((event) => {
        event.preventDefault();

        if (formState.isFormValid) {
            const { "hotel-name": hotelName, "hotel-price": price, "check-in-date": CheckInDate, "check-out-date": CheckOutDate, "check-in-time": CheckInTime, "check-out-time": CheckOutTime, rooms } = formState.form;

            editHotelAction({ hotelName: hotelName.value, price: +price.value, ...(isCoverChanged.current && { cover }), CheckInDate: CheckInDate.value, CheckOutDate: CheckOutDate.value, CheckInTime: CheckInTime.value, CheckOutTime: CheckOutTime.value, rooms: +rooms.value }, [hotel?.id]);
        } else {
            showToast("warning", "Please enter valid data.");
        }
    }, [formState.isFormValid, cover]);

    const onChangeCover = (event) => {
        setCoverHandler(event, 600, 600);
    };

    return createPortal(
        <>
            <div className={`bg-white shadow-box rounded-2xl fixed top-20 left-0 right-0 m-auto z-20 w-[80%] transition-all ${isShow ? "opacity-100 visible" : "opacity-0 invisible"}`}>
                <div className="p-6 flex justify-between items-center text-slate-500 font-MontserratMedium border-b border-gray-200">
                    <TextByIcon text="Edit Hotel Info" className="text-blue-500 flex items-center gap-x-2" iconID="question-mark-circle" iconClasses="w-5 h-5" />
                    <button onClick={onClose}>
                        <Svg iconID="x-mark" className="w-6 h-6" />
                    </button>
                </div>
                <div className="flex items-start justify-between gap-x-6 p-6">
                    <form className="w-full">
                        <GridSystem parentClaasName="grid grid-cols-4 gap-6">
                            <Input type="text" init={hotel?.hotelName} id="hotel-name" label="Hotel Name" wrapperClassName="col-span-2" errorMessage='The minimum of hotel name is 5 character' validations={useMemo(() => [requiredValidator(), minValidator(5), maxValidator(50)], [])} onInput={onInput} />
                            <Input type="text" init={String(hotel?.price)} customProps={useMemo(() => ({ inputmode: "numeric", pattern: "[0-9]+" }), [])} id="hotel-price" label="Price" wrapperClassName="col-span-2" errorMessage='InValid price' validations={useMemo(() => [requiredValidator(), numberValidator()], [])} onInput={onInput} />
                            <Input type="text" init={hotel?.checkInDate} id="check-in-date" label="Check In Date" wrapperClassName="col-span-1" validations={useMemo(() => [requiredValidator(), dateValidator()], [])} onInput={onInput} />
                            <Input type="text" init={hotel?.checkOutDate} id="check-out-date" label="Check Out Date" wrapperClassName="col-span-1" validations={useMemo(() => [requiredValidator(), dateValidator()], [])} onInput={onInput} />
                            <Input type="text" init={hotel?.checkInTime} id="check-in-time" label="Check In Time" wrapperClassName="col-span-1" validations={useMemo(() => [requiredValidator(), timeValidator()], [])} onInput={onInput} />
                            <Input type="text" init={hotel?.checkOutTime} id="check-out-time" label="Check Out Time" wrapperClassName="col-span-1" validations={useMemo(() => [requiredValidator(), timeValidator()], [])} onInput={onInput} />
                            <Input type="text" init={String(hotel?.rooms)} customProps={useMemo(() => ({ inputmode: "numeric", pattern: "[0-9]+" }), [])} id="rooms" label="Rooms Count" wrapperClassName="col-span-1" errorMessage='InValid rooms count' validations={useMemo(() => [requiredValidator(), numberValidator()], [])} onInput={onInput} />
                            <CmsButton className="max-w-[200px] row-start-4" isLoading={isFetching} onClick={editHotelHandler}>Edit Hotel</CmsButton>
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
