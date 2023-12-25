import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import GridSystem from "../../components/GridSystem/GridSystem";
import LoginAndSignUpSlider from "../../components/LoginAndSignUpSlider/LoginAndSignUpSlider";
import LoginAndSignUpTemplate from "../../components/LoginAndSignUpTemplate/LoginAndSignUpTemplate";
import Input from "../../components/Form/Input";
import PasswordInput from "../../components/Form/PasswordInput";
import Button from "../../components/Button/Button";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { requiredValidator, minValidator, maxValidator, emailValidator, phoneValidator } from "../../validator/rules";
import AuthContext from "../../context/AuthContext";
import PageTransition from "../../components/PageTransition/PageTransition";
import LoadingButton from "../../components/Button/LoadingButton";
import Toast from "../../components/Toast/Toast";
import useToast from "../../hooks/useToast";

export default function SignUp() {
    const [isPendding, setIsPendding] = useState(false);

    const authContext = useContext(AuthContext);

    const navigate = useNavigate();

    const location = useLocation();
    const phoneValue = useRef();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        phoneValue.current = searchParams.get("phone");
    }, [location]);

    const [isShowToast, showToast, toastOptions] = useToast();

    const [formState, onInput] = useForm(["signup-username", "signup-email", "signup-phone", "signup-password", "signup-confirm-password"]);

    const registerUser = useCallback(async (event) => {
        event.preventDefault();

        if (formState.isFormValid) {
            const { "signup-username": username, "signup-email": email, "signup-phone": phone, "signup-password": password, "signup-confirm-password": confirmPassword } = formState.form;

            if (password.value === confirmPassword.value) {
                setIsPendding(true);
                const response = await fetch("http://localhost:3000/api/users", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ username: username.value, email: email.value, phone: phone.value, password: password.value }),
                });

                setIsPendding(false);

                if (response.ok) {
                    const result = await response.json();

                    console.log(result);
                    showToast("success", "successful sign up, navigating to home page...");
                    authContext.login(result.token);
                    navigate("/");
                    const registerTO = setTimeout(() => {
                        clearTimeout(registerTO);
                        navigate("/");
                    }, 1000);
                } else {
                    showToast("error", "Something wrong, please try latter.");
                }
            } else {
                showToast("warning", "Password and confirm is not matched.");
            }
        } else {
            showToast("warning", "Please enter valid data.");
        }
    }, [formState.isFormValid]);

    return (
        <PageTransition>
            <div className="container pt-10 sm:py-20">
                <GridSystem parentClaasName="grid grid-cols-1 lg:grid-cols-5 gap-x-16 xl:gap-x-32">
                    <div className="col-span-2 hidden lg:block">
                        <LoginAndSignUpSlider />
                    </div>
                    <div className="col-span-3 max-w-full lg:max-w-[700px]">
                        <LoginAndSignUpTemplate title="Sign up" subTitle="Let’s get you all st up so you can access your personal account.">
                            <form className="mt-12">
                                <div className="grid grid-cols-2 gap-6">
                                    <Input type="text" id="signup-username" label="Username" wrapperClassName="col-span-2" errorMessage="The minimum of username is 5 character" validations={useMemo(() => [requiredValidator(), minValidator(5), maxValidator(20)], [])} onInput={onInput} />
                                    <Input type="email" id="signup-email" label="Email" wrapperClassName="col-span-2 sm:col-span-1" errorMessage="Please enter a valid email address" validations={useMemo(() => [requiredValidator(), emailValidator()], [])} onInput={onInput} />
                                    <Input type="tel" id="signup-phone" init={phoneValue.current || ""} label="Phone Number" wrapperClassName="col-span-2 sm:col-span-1" errorMessage="Please enter a valid persian phone number" validations={useMemo(() => [requiredValidator(), phoneValidator()], [])} onInput={onInput} />
                                    <PasswordInput type="password" id="signup-password" label="Password" wrapperClassName="col-span-2" errorMessage="The minimum of password is 5 character" validations={useMemo(() => [requiredValidator(), minValidator(5), maxValidator(20)], [])} onInput={onInput} />
                                    <PasswordInput type="password" id="signup-confirm-password" label="Confirm Password" wrapperClassName="col-span-2" errorMessage="The minimum of password is 5 character" validations={useMemo(() => [requiredValidator(), minValidator(5), maxValidator(20)], [])} onInput={onInput} />
                                    <div className="flex justify-between items-center text-sm font-MontserratMedium col-span-2">
                                        <div className="flex items-center gap-x-2">
                                            <input type="checkbox" id="signup-remember-me" className="accent-primary w-3.5 h-3.5 border-slate-200" />
                                            <label htmlFor="signup-remember-me">
                                                I agree to all the <span className="text-error">Terms</span> and <span className="text-error">Privacy Policies</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <LoadingButton isLoading={isPendding} props={useMemo(() => { type: "submit" }, [])} className="mt-10 w-full font-MontserratSemiBold" onClick={registerUser}>
                                    Create account
                                </LoadingButton>
                                <span className="block text-center mt-4 text-sm font-MontserratMedium">
                                    Already have an account?{" "}
                                    <Link to="/login" className="text-error">
                                        Login
                                    </Link>
                                </span>
                            </form>
                        </LoginAndSignUpTemplate>
                    </div>
                </GridSystem>
            </div>
            <Toast isShow={isShowToast} {...toastOptions} />
        </PageTransition>
    );
}
