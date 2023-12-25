import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import TextByIcon from "../../../components/TextByIcon/TextByIcon";
import Svg from "../../../components/Svg/Svg";
import Overlay from "../../../components/Overlay/Overlay";
import GridSystem from "../../../components/GridSystem/GridSystem";
import Input from "../../../components/Form/Input";
import PasswordInput from "../../../components/Form/PasswordInput";
import { requiredValidator, minValidator, maxValidator, emailValidator, phoneValidator } from "../../../validator/rules";
import useForm from "../../../hooks/useForm";
import useFetch from "../../../hooks/useFetch";
import ToastContext from "../../../context/ToastContext";
import CmsButton from "./CmsButton";

export default function EditUserModal({ isShow = false, onClose = () => {}, onConfirm = () => {}, userInfo = {} }) {
    const [formState, onInput] = useForm(["edit-username", "edit-email", "edit-phone", "edit-password"]);

    const { showToast } = useContext(ToastContext);

    const [editUserAction, isFetching] = useFetch({
        url: "https://node-travel-agency.liara.run/api/users/",
        method: "PUT",
        contentType: true,
        authorization: true,
        authorizationToken: userInfo?.token,
        successCallback: () => {
            showToast("success", "Information edited successfully.");
            onClose();
            onConfirm();
        },
        errorCallback: () => {
            showToast("error", "Something wrong, please try latter.");
            onClose();
        },
    });

    const editUserInfosHandler = useCallback((event) => {
        event.preventDefault();

        if (formState.isFormValid) {
            const { "edit-username": username, "edit-email": email, "edit-phone": phone, "edit-password": password } = formState.form;

            editUserAction({ username: username.value, email: email.value, phone: phone.value, password: password.value });
        } else {
            showToast("warning", "Please enter valid data.");
        }
    }, [formState.isFormValid]);

    return createPortal(
        <>
            <div className={`bg-white shadow-box rounded-2xl fixed top-20 left-0 right-0 m-auto z-20 w-[95%] sm:w-4/5 lg:w-[800px] transition-all ${isShow ? "opacity-100 visible" : "opacity-0 invisible"}`}>
                <div className="p-6 flex justify-between items-center text-slate-500 font-MontserratMedium border-b border-gray-200">
                    <TextByIcon text="Edit user info" className="text-blue-500 flex items-center gap-x-2" iconID="question-mark-circle" iconClasses="w-5 h-5" />
                    <button onClick={onClose}>
                        <Svg iconID="x-mark" className="w-6 h-6" />
                    </button>
                </div>
                <form className="p-6">
                    <GridSystem parentClaasName="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Input type="text" id="edit-username" label="User Name" init={userInfo?.username} wrapperClassName="col-span-1" errorMessage="The minimum of username is 5 character" validations={useMemo(() => [requiredValidator(), minValidator(5), maxValidator(20)], [])} onInput={onInput} />
                        <Input type="email" id="edit-email" label="Email" init={userInfo?.email} wrapperClassName="col-span-1" errorMessage="Please enter a valid email address" validations={useMemo(() => [requiredValidator(), emailValidator()], [])} onInput={onInput} />
                        <Input type="tel" id="edit-phone" label="Phone Number" init={userInfo?.phone} wrapperClassName="col-span-1" errorMessage="Please enter a valid persian phone number" validations={useMemo(() => [requiredValidator(), phoneValidator()], [])} onInput={onInput} />
                        <PasswordInput id="edit-password" label="Password" init={userInfo?.password} wrapperClassName="col-span-1" errorMessage="The minimum of password is 5 character" validations={useMemo(() => [requiredValidator(), minValidator(5), maxValidator(20)], [])} onInput={onInput} />
                        <CmsButton className='max-w-[200px] lg:row-start-4' isLoading={isFetching} onClick={editUserInfosHandler}>Edit Infos</CmsButton>
                    </GridSystem>
                </form>
            </div>
            <Overlay isShow={isShow} onClose={onClose} />
        </>,
        document.body
    );
}
