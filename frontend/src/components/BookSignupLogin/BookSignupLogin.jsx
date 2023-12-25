import React, { useState } from "react";
import Input from "../Form/Input";
import Button from "../Button/Button";
import Svg from "../Svg/Svg";
import useForm from "../../hooks/useForm";
import { phoneValidator } from "../../validator/rules";

export default function BookSignupLogin() {
    const [formState, onInput] = useForm(["phone"]);

    return (
        <div className="bg-white p-6 rounded-2xl shadow-box">
            <div className="space-y-6">
                <h4 className="font-TradeGothic font-bold xs:text-lg">Login or Sign up to book</h4>
                <Input id="phone" label="Phone Number" onInput={onInput} validations={[phoneValidator()]} />
                <span className="block text-sm md:text-base">
                    We’ll call or text you to confirm your number. Standard message and data rates apply. <span className="font-MontserratMedium">Privacy Policy</span>
                </span>
                <Button title="Continue" size="lg" className="w-full" to={`/signup?phone=${formState.form.phone.value}`} />
            </div>
            <div className="login-signup-line relative text-center mt-10">
                <span className="bg-white text-slate-900/50 px-4">Or</span>
            </div>
            <div className="mt-10 grid grid-cols-6 gap-4">
                <Button title="FaceBook" size="lg" className='col-span-3 sm:col-span-2' outline flexible beforeIcon={<Svg iconID="facebook" className="w-6 h-6 text-blue-500 shrink-0" />} />
                <Button title="Google" size="lg" className='col-span-3 sm:col-span-2' outline flexible beforeIcon={<Svg iconID="google" className="w-6 h-6 shrink-0" />} />
                <Button title="Apple" size="lg" className='col-span-6 sm:col-span-2' outline flexible beforeIcon={<Svg iconID="apple" className="w-6 h-6 shrink-0" />} />
                <Button title="Continue with email" size="lg" to="/signup" outline className="col-span-6" beforeIcon={<Svg iconID="message" className="w-6 h-6 shrink-0" />} />
            </div>
        </div>
    );
}
