import React, { useState } from "react";
import { createPortal } from "react-dom";
import Svg from "../Svg/Svg";
import TextByIcon from "../TextByIcon/TextByIcon";

export default function Toast({ varient = "success", message = "", isShow, onClose }) {

    const toastVarients = {
        success: {
            text: "Success",
            iconID: "shield-check",
            colorClass: "text-green-600",
        },
        error: {
            text: "Error",
            iconID: "shield-exclamation",
            colorClass: "text-rose-500",
        },
        warning: {
            text: "Warning",
            iconID: "exclamation-triangle",
            colorClass: "text-amber-500",
        },
        info: {
            text: "Info",
            iconID: "information-circle",
            colorClass: "text-sky-500",
        },
    };

    const { text, iconID, colorClass } = toastVarients[varient];

    return createPortal(
        <div className={`bg-white p-4 rounded-lg fixed top-8 shadow-md min-w-[90%] sm:min-w-[400px] overflow-hidden transition-all z-30 duration-300 ${isShow ? "left-2 sm:left-8" : "-left-[500px] scale-0"}`}>
            <div className="flex items-center justify-between pb-2 border-b border-b-slate-100">
                <TextByIcon text={text} className={`${colorClass} font-MontserratMedium flex items-center gap-x-2`} iconID={iconID} iconClasses="w-6 h-6" />
                <button className="p-2 rounded-full transition-all hover:bg-slate-100/50" onClick={onClose}>
                    <Svg iconID="x-mark" className="w-5 h-5 text-slate-900" />
                </button>
            </div>
            <span className="block mt-2 text-slate-500 line-clamp-1 text-sm sm:text-base">{message}</span>
            <div className={`absolute bottom-0 left-0 w-0 ${colorClass} bg-current h-1 ${isShow && "animate-ziroToFull"}`}></div>
        </div>,
        document.body
    );
}
