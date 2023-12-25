import React from "react";
import { createPortal } from "react-dom";
import TextByIcon from "../TextByIcon/TextByIcon";
import Svg from "../Svg/Svg";
import Overlay from "../Overlay/Overlay";

export default function QuestionModal({ isShow = false, message, onClose, onAccept, danger }) {
    return createPortal(
        <>
            <div className={`bg-white p-4 rounded-lg fixed inset-x-0 mx-auto shadow-box w-[90%] sm:w-[500px] transition-all z-30 duration-300 top-32 ${isShow ? "visible opacity-100" : "invisible opacity-0"}`}>
                <button className="p-2 rounded-full transition-all hover:bg-slate-100/50 absolute top-4 right-4" onClick={onClose}>
                    <Svg iconID="x-mark" className="w-5 h-5 text-slate-900" />
                </button>
                <div className="flex-center">
                    <Svg iconID={danger ? "exclamation-triangle" : "information-circle"} className={`w-20 h-20 ${danger ? "text-amber-300" : "text-slate-300"}`} />
                </div>
                <p className="mt-4 mb-8 text-slate-500 text-center">{message}</p>
                <div className="flex gap-4 justify-center flex-wrap child:grow">
                    <button className="py-3 px-4 min-w-[140px] font-MontserratMedium rounded-md text-slate-500 bg-slate-50 border-2 border-slate-100 hover:bg-slate-100 hover:text-slate-600" onClick={onClose}>
                        Cancel
                    </button>
                    <button
                        className={`py-3 px-4 min-w-[140px] font-MontserratMedium rounded-md text-white transition-all ${danger ? "bg-rose-500 hover:bg-rose-600" : "bg-slate-900 hover:bg-slate-800`"}`}
                        onClick={() => {
                            onClose();
                            onAccept();
                        }}
                    >
                        Accept
                    </button>
                </div>
            </div>
            <Overlay isShow={isShow} onClose={onClose} />
        </>,
        document.body
    );
}
