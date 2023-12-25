import React, { memo } from "react";
import { Link } from "react-router-dom";
import Svg from "../Svg/Svg";
import Button from "../Button/Button";

export default memo(function LoginAndSignUpTemplate({ children, title, subTitle, isLoginPage, hasLogo = true }) {
    return (
        <div>
            <div className="text-slate-900">
                <div className="flex justify-between flex-col-reverse sm:flex-row gap-y-8 items-center">
                    <div className="text-center sm:text-start w-full sm:w-auto">
                        <h2 className="font-TradeGothic font-bold text-[40px]">{title}</h2>
                        <p className="mt-4 opacity-75">{subTitle}</p>
                    </div>
                    {hasLogo && (
                        <Link to="/">
                            <Svg iconID="app-logo" className="w-[110px] h-9" />
                        </Link>
                    )}
                </div>
                <div>{children}</div>
                <div className="login-signup-line relative text-center mt-10">
                    <span className="bg-white text-slate-900/50 px-4">{isLoginPage ? "Or login with" : "Or Sign up with"}</span>
                </div>
                <div className="mt-10 mb-4 flex flex-col sm:flex-row gap-4 child:font-MontserratMedium child:text-slate-700">
                    <button className="py-2 px-4 h-12 border border-slate-200 flex-center gap-x-2 rounded-md grow hover:bg-slate-50">
                        <Svg iconID="facebook" className="w-6 h-6 text-blue-500" />
                        FaceBook
                    </button>
                    <button className="py-2 px-4 h-12 border border-slate-200 flex-center gap-x-2 rounded-md grow hover:bg-slate-50">
                        <Svg iconID="google" className="w-6 h-6" />
                        Google
                    </button>
                    <button className="py-2 px-4 h-12 border border-slate-200 flex-center gap-x-2 rounded-md grow hover:bg-slate-50">
                        <Svg iconID="apple" className="w-6 h-6" />
                        Apple
                    </button>
                </div>
            </div>
        </div>
    );
});
