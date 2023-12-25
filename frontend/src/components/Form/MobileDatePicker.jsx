import React from "react";
import { createPortal } from "react-dom";
import Overlay from "../Overlay/Overlay";
import DatePicker from "./DatePicker";

export default function MobileDatePicker({ isShow, onSubmit, onCancel }) {

    const overlayHandler = (event) => {
        event.target.classList.contains('overlay') && onCancel()
    }

    return createPortal(
        <>
            <div className={`overlay fixed inset-0 w-full h-full bg-black/25 backdrop-blur-[2px] flex-center z-30 transition-all ${isShow ? "opacity-100 visible" : "opacity-0 invisible"}`} onClick={overlayHandler}>
                <DatePicker onSubmit={onSubmit} onCancel={onCancel} />
            </div>
        </>,
        document.body
    );
}
