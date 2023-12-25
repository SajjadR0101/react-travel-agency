import React from "react";
import Svg from "../../../components/Svg/Svg";

export default function ShowInfoBox({ title, children, className = '' }) {
    return (
        <div className={`bg-white shadow-box rounded-2xl ${className}`}>
            <div className="p-6 flex justify-between items-center text-slate-500 font-MontserratMedium border-b border-gray-200">
                <span>{title}</span>
                <Svg iconID="dots" className="w-6 h-6" />
            </div>
            {children}
        </div>
    );
}
