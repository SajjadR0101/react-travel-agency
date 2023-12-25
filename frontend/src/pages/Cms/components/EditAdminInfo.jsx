import React, { useCallback, useContext, useMemo } from "react";
import GridSystem from "../../../components/GridSystem/GridSystem";
import Input from "../../../components/Form/Input";
import PasswordInput from "../../../components/Form/PasswordInput";
import { requiredValidator, minValidator, maxValidator, emailValidator, phoneValidator } from "../../../validator/rules";
import useForm from "../../../hooks/useForm";
import useFetch from "../../../hooks/useFetch";
import ToastContext from "../../../context/ToastContext";
import AuthContext from "../../../context/AuthContext";
import FileInput from "../../../components/Form/FileInput";
import useUploader from "../../../hooks/useUploader";
import CmsButton from './CmsButton'

export default function EditAdminInfo() {
    const authContext = useContext(AuthContext);
    const userInfo = authContext.userInfo;

    const [formState, onInput] = useForm(["edit-username", "edit-email", "edit-phone", "edit-password"]);

    const { showToast } = useContext(ToastContext);

    const [profile, setProfileHandler] = useUploader(undefined, () => showToast("warning", "Type of profile only png or jpeg."));

    const [editAdminInfoAction, isFetching] = useFetch({
        url: "https://node-travel-agency.liara.run/api/users/",
        method: "PUT",
        contentType: true,
        authorization: true,
        successCallback: () => {
            authContext.refreshUserInfo();
            showToast("success", "Your information edited successfully.");
        },
        errorCallback: () => showToast("error", "Something wrong, please try latter."),
    });

    const editAdminInfiHandler = useCallback((event) => {
        event.preventDefault();

        if (formState.isFormValid) {
            const { "edit-username": username, "edit-email": email, "edit-phone": phone, "edit-password": password } = formState.form;

            editAdminInfoAction({ username: username.value, email: email.value, phone: phone.value, password: password.value, ...(!!profile && { profile }) });
        } else {
            showToast("warning", "Please enter valid data.");
        }
    }, [formState.isFormValid, profile]);

    const onChangeProfile = useCallback((event) => {
        setProfileHandler(event, 250, 250);
    }, []);

    return (
        <form className="mt-6">
            <GridSystem parentClaasName="grid grid-cols-2 gap-6">
                <Input type="text" id="edit-username" label="User Name" init={userInfo?.username} wrapperClassName="col-span-1" errorMessage="The minimum of username is 5 character" validations={useMemo(() => [requiredValidator(), minValidator(5), maxValidator(20)], [])} onInput={onInput} />
                <Input type="email" id="edit-email" label="Email" init={userInfo?.email} wrapperClassName="col-span-1" errorMessage="Please enter a valid email address" validations={useMemo(() => [requiredValidator(), emailValidator()], [])} onInput={onInput} />
                <Input type="tel" id="edit-phone" label="Phone Number" init={userInfo?.phone} errorMessage="Please enter a valid persian phone number" wrapperClassName="col-span-1" validations={useMemo(() => [requiredValidator(), phoneValidator()], [])} onInput={onInput} />
                <PasswordInput id="edit-password" label="Password" init={userInfo?.password} wrapperClassName="col-span-1" errorMessage="The minimum of password is 5 character" validations={useMemo(() => [requiredValidator(), minValidator(5), maxValidator(20)], [])} onInput={onInput} />
                <FileInput className="cms-btn h-14" id="admin-profile" title="Upload new profile" onChange={onChangeProfile} uploaded={!!profile} />
                <CmsButton className="max-w-[200px] row-start-4" isLoading={isFetching} onClick={editAdminInfiHandler}>Edit Infos</CmsButton>
            </GridSystem>
        </form>
    );
}
