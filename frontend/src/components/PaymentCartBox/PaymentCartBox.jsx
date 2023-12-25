import React from "react";
import Svg from "../Svg/Svg";

export default function PaymentCartBox({ id: cardID = null, number = "", expDate = "", onRemove = () => {} }) {
    return (
        <div className="text-slate-900 h-40 sm:h-60 bg-primary rounded-2xl p-4 flex flex-col justify-between">
            <div className="flex justify-between items-start">
                <div className="font-MontserratSemiBold child:block">
                    <span className="sm:text-2xl">**** **** ****</span>
                    <span className="text-xl sm:text-3xl sm:-mt-2.5">{number.slice(-4)}</span>
                </div>
                <button onClick={() => onRemove(null, [cardID])}>
                    <Svg iconID="bin" className="w-5 sm:w-6 h-5 sm:h-6" />
                </button>
            </div>
            <div className="flex justify-between items-center">
                <div className="child:block">
                    <span className="font-MontserratMedium text-xs">Valid Thru</span>
                    <span className="font-MontserratSemiBold sm:text-xl">{expDate}</span>
                </div>
                <span>
                    <Svg iconID="visa" className="w-[52px] h-[32px]" />
                </span>
            </div>
        </div>
    );
}
