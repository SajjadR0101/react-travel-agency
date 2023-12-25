import React, { useCallback, useContext, useMemo, useState } from "react";
import GridSystem from "../../components/GridSystem/GridSystem";
import LoginAndSignUpSlider from "../../components/LoginAndSignUpSlider/LoginAndSignUpSlider";
import LoginAndSignUpTemplate from "../../components/LoginAndSignUpTemplate/LoginAndSignUpTemplate";
import Input from "../../components/Form/Input";
import PasswordInput from "../../components/Form/PasswordInput";
import Button from "../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { requiredValidator, minValidator, maxValidator, emailValidator } from "../../validator/rules";
import AuthContext from "../../context/AuthContext";
import Toast from "../../components/Toast/Toast";
import useToast from "../../hooks/useToast";
import PageTransition from "../../components/PageTransition/PageTransition";
import LoadingButton from "../../components/Button/LoadingButton";
import CheckBox from "../../components/Form/CheckBox";

export default function Login() {
    const [isPendding, setIsPendding] = useState(false);

    const authContext = useContext(AuthContext);

    const navigate = useNavigate();

    const [formState, onInput] = useForm(["login-email", "login-password"]);

    const [isShowToast, showToast, toastOptions] = useToast();

    const loginUser = useCallback(async (event) => {
        event.preventDefault();

        if (formState.isFormValid) {
            setIsPendding(true);

            const { "login-email": email, "login-password": password } = formState.form;

            const response = await fetch(`https://node-travel-agency.liara.run/api/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: email.value, password: password.value }),
            });

            setIsPendding(false);

            if (response.ok) {
                const result = await response.json();
                const mainUser = result[0];
                if (mainUser) {
                    showToast("success", "successful login, navigating to home page...");
                    authContext.login(null, mainUser);
                    const loginTO = setTimeout(() => {
                        clearTimeout(loginTO);
                        navigate("/");
                    }, 1000);
                } else {
                    showToast("warning", "Hi, plaese enter valid data to login.");
                }
            } else {
                showToast("error", "Hi, something wrong, please try latter.");
            }
        } else {
            showToast("warning", "Please enter valid data.");
        }
    }, [formState.isFormValid])

    return (
        <PageTransition>
            <div className="container pt-10 sm:pt-20">
                <GridSystem parentClaasName="grid grid-cols-1 lg:grid-cols-2 gap-x-32">
                    <div className="lg:max-w-[600px]">
                        <LoginAndSignUpTemplate title="Login" subTitle="Login to access your Golobe account" isLoginPage>
                            <form className="mt-12">
                                <div className="flex flex-col gap-y-6">
                                    <Input type="email" id="login-email" label="Email" errorMessage='Please enter a valid email address' onInput={onInput} validations={useMemo(() => [requiredValidator(), emailValidator()], [])} />
                                    <PasswordInput type="password" id="login-password" errorMessage='The minimum of password is 5 character' label="Password" onInput={onInput} validations={useMemo(() => [requiredValidator(), minValidator(5), maxValidator(20)], [])} />
                                    <div className="flex justify-between items-center text-sm font-MontserratMedium">
                                        <div className="flex items-center gap-x-2">
                                            <input type="checkbox" id="login-remember-me" className="accent-primary w-3.5 h-3.5 border-slate-200" />
                                            <label htmlFor="login-remember-me">Remember me</label>
                                        </div>
                                        <span className="text-error">Forgot Password</span>
                                    </div>
                                </div>
                                <LoadingButton isLoading={isPendding} props={useMemo(() => { type: "submit" }, [])} className="mt-10 w-full font-MontserratSemiBold" onClick={loginUser}>
                                    Login
                                </LoadingButton>
                                <span className="block text-center mt-4 text-sm font-MontserratMedium">
                                    Don’t have an account?{" "}
                                    <Link to="/signup" className="text-error">
                                        Sign up
                                    </Link>
                                </span>
                            </form>
                        </LoginAndSignUpTemplate>
                    </div>
                    <div className="hidden lg:block max-w-[600px]">
                        <LoginAndSignUpSlider />
                    </div>
                </GridSystem>
            </div>
            <Toast {...toastOptions} isShow={isShowToast} />
        </PageTransition>
    );
}
