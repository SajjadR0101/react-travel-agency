import React, { useCallback, useContext } from "react";
import GridSystem from "../../../components/GridSystem/GridSystem";
import Input from "../../../components/Form/Input";
import PasswordInput from "../../../components/Form/PasswordInput";
import { requiredValidator, minValidator, maxValidator, emailValidator, phoneValidator } from "../../../validator/rules";
import useForm from "../../../hooks/useForm";
import ToastContext from "../../../context/ToastContext";
import CmsButton from './CmsButton'
import useFetch from "../../../hooks/useFetch";

export default function AddNewUser({ onAddUser }) {
    const [formState, onInput, clearAllInput] = useForm(["username", "signup-email", "signup-phone", "signup-password", "signup-confirm-password"]);

    const { showToast } = useContext(ToastContext);

    const [addNewUserAction, isFetching] = useFetch({
        url: 'https://node-travel-agency.liara.run/api/users',
        method: 'POST',
        contentType: true,
        successCallback: () => {
            showToast("success", "User add to database successfully.");
            onAddUser();
            clearAllInput();
        },
        errorCallback: () => {
            showToast("error", "Something wrong, please try latter.");
        }
    })

    const registerUser = useCallback(async (event) => {
        event.preventDefault();

        if (formState.isFormValid) {
            const { username, "signup-email": email, "signup-phone": phone, "signup-password": password, "signup-confirm-password": confirmPassword } = formState.form;

            if (password.value === confirmPassword.value) {
                addNewUserAction({ username: username.value, email: email.value, phone: phone.value, password: password.value })
            } else {
                showToast("warning", "Password and confirm not matched.");
            }
        } else {
            showToast("warning", "Please Enter Valid Data.");
        }
    }, [formState.isFormValid]);

    return (
        <>
            <div>
                <h3 className="font-TradeGothic font-bold text-3xl text-slate-600 mb-6">Add New User</h3>
                <form>
                    <GridSystem parentClaasName="grid grid-cols-3 gap-6">
                        <Input type="text" id="username" label="Username" wrapperClassName="col-span-1" errorMessage="The minimum of username is 5 character" validations={[requiredValidator(), minValidator(5), maxValidator(20)]} onInput={onInput} />
                        <Input type="email" id="signup-email" label="Email" wrapperClassName="col-span-1" errorMessage="Please enter a valid email address" validations={[requiredValidator(), emailValidator()]} onInput={onInput} />
                        <Input type="tel" id="signup-phone" label="Phone Number" wrapperClassName="col-span-1" errorMessage="Please enter a valid persian phone number" validations={[requiredValidator(), phoneValidator()]} onInput={onInput} />
                        <PasswordInput type="password" id="signup-password" label="Password" wrapperClassName="col-span-1" errorMessage="The minimum of password is 5 character" validations={[requiredValidator(), minValidator(5), maxValidator(20)]} onInput={onInput} />
                        <PasswordInput type="password" id="signup-confirm-password" label="Confirm Password" wrapperClassName="col-span-1" errorMessage="The minimum of password is 5 character" validations={[requiredValidator(), minValidator(5), maxValidator(20)]} onInput={onInput} />
                        <CmsButton className='max-w-[200px] row-start-3' isLoading={isFetching} onClick={registerUser}>Add User</CmsButton>
                    </GridSystem>
                </form>
            </div>
        </>
    );
}
