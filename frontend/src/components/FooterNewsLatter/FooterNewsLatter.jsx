import React, { useState } from "react";
import Svg from "../Svg/Svg";
import Toast from "../Toast/Toast";
import useToast from "../../hooks/useToast";
import { testEmail } from "../../validator/regex";
import useFetch from "../../hooks/useFetch";

export default function FooterNewsLatter() {
    const [isShowToast, showToast, toastOptions] = useToast();

    const [addNewsLatterAction] = useFetch({
        url: "https://node-travel-agency.liara.run/api/newslatter",
        method: "POST",
        contentType: true,
        successCallback: () => showToast("success", "Your email successfully add to newslatter."),
        errorCallback: () => showToast("error", "Something wrong, please try latter."),
    });

    const submitForm = async (event, email, setEmail) => {
        event.preventDefault();

        const userEmail = email.trim();

        if (testEmail(userEmail)) {
            addNewsLatterAction({ email: userEmail });
            setEmail("");
        } else {
            showToast("warning", "Plaese enter a valid email address.");
        }
    };

    return (
        <>
            <div className="relative flex justify-between px-6 rounded-2.5xl bg-low-green -translate-y-1/2">
                <div className="text-slate-900 py-6 w-full lg:max-w-[500px] xl:max-w-[600px] text-center sm:text-start">
                    <h4 className="font-TradeGothic font-bold text-[38px] xs:text-[44px]/[54px]">
                        Subscribe <br />
                        Newsletter
                    </h4>
                    <div className="mt-6">
                        <span className="font-TradeGothic font-bold text-xl opacity-80">The Travel</span>
                        <p className="mt-2 font-MontserratMedium opacity-70 text-sm sm:text-base">Get inspired! Receive travel discounts, tips and behind the scenes stories.</p>
                    </div>
                    <FooterNewsLatterForm submitHandler={submitForm} />
                </div>
                <div>
                    <Svg iconID="footer-subscribe" className="w-[400px] h-[305px] absolute bottom-0 right-6 hidden lg:inline-block" />
                </div>
            </div>
            <Toast {...toastOptions} isShow={isShowToast} />
        </>
    );
}

const FooterNewsLatterForm = ({ submitHandler }) => {
    const [email, setEmail] = useState("");

    return (
        <form className="mt-4 flex flex-col sm:flex-row items-center gap-4">
            <input type="email" placeholder="Your email address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full sm:flex-1 h-14 py-2 pl-4 rounded-lg outline-none text-[#1C1B1F] placeholder:text-[#1C1B1F]" />
            <button type="submit" className="font-MontserratSemiBold text-white bg-slate-900 flex-center h-14 py-2 px-4 rounded-lg" onClick={(e) => submitHandler(e, email, setEmail)}>
                Subscribe
            </button>
        </form>
    );
};
