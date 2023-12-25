import React, { useEffect, useState, useRef } from "react";
import Svg from "../Svg/Svg";

export default function Select({ label = "", id, beforeIcon = null, options, placeholder = "Select an option", wrapperClassName = "", onSelect = null }) {
    const [value, setValue] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const setSlelectedValue = (event) => {
        setValue(JSON.parse(event.target.dataset.value));
    };

    const toggleSelectOption = (event) => {
        setIsOpen((prevState) => !prevState);
    };

    useEffect(() => {
        value && onSelect && onSelect(id, value?.value, setValue, true);
    }, [value]);

    return (
        <div id={id} className={`relative cursor-pointer z-20 ${wrapperClassName}`} onClick={toggleSelectOption}>
            <div className={`relative flex items-center gap-x-1 pl-4 py-2 h-14 border rounded border-slate-500 text-slate-900`}>
                {beforeIcon && <div className="pr-3 text-[#49454F]">{beforeIcon}</div>}
                <div className="w-full line-clamp-1">{value?.title || placeholder}</div>
                <label className={`absolute bg-white px-1 -top-3.5 left-3`}>{label}</label>
                <div className="p-3 text-[#49454F]">
                    <Svg iconID="chevron-down" className="w-6 h-6" />
                </div>
            </div>
            <div className={`select-box-options absolute top-16 w-full py-2 max-h-[195px] overflow-auto bg-white border pointer-events-none rounded border-slate-300 text-slate-900 z-10 origin-top transition-all ${isOpen ? "visible opacity-100 scale-100" : "invisible opacity-0 scale-0"}`}>
                <ul className="pointer-events-none">
                    {options.map((opt) => {
                        return (
                            <li key={opt.title} className="py-2.5 px-4 rounded hover:bg-slate-50 cursor-pointer pointer-events-auto transition-all line-clamp-1" data-value={JSON.stringify(opt)} onClick={setSlelectedValue}>
                                {opt.title}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
