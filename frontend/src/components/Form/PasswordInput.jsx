import React, { useEffect, useState, useRef, memo } from "react";
import Svg from "../Svg/Svg";
import validator from "../../validator/validator";

export default memo(function PasswordInput({ label = "", id = "", init = "", beforeIcon = null, errorMessage = "", wrapperClassName = "", validations, onInput = null }) {
    const [value, setValue] = useState("");
    const isValid = useRef(false);
    const [state, setState] = useState("");
    const [inputType, setInputType] = useState("password");
    const isFirstRender = useRef(true);

    const stateHandler = () => (value.length === 0 ? "normal" : ["error", "success"][+isValid.current]);

    useEffect(() => {
        setValue(init);
        setState(stateHandler);
    }, [init]);

    useEffect(() => {
        isValid.current = onInput && validator(validations, value);

        if (isFirstRender.current) {
            onInput && onInput(id, value, setValue, isValid.current);
            isFirstRender.current = false;
        } else {
            onInput && onInput(id, value, null, isValid.current);
            state && setState(stateHandler);
        }
    }, [value]);

    const showPasswordHandler = () => {
        setInputType((prevType) => (prevType === "password" ? "text" : "password"));
    };

    return (
        <div className={wrapperClassName}>
            <div className={`relative flex items-center gap-x-1 h-14 text-slate-900`}>
                {beforeIcon && <div className="absolute left-0 p-3 text-[#49454F] z-[2]">{beforeIcon}</div>}
                <input
                    type={inputType}
                    id={id}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className={`pl-4 py-2 rounded peer relative outline-none h-full w-full text-[#1C1B1F] border border-slate-500`}
                    onBlur={() => {
                        !state && setState(stateHandler);
                        onBlur(value);
                    }}
                    onFocus={() => !value && state && setState("")}
                />
                <label htmlFor={id} className={`absolute pointer-events-none bg-white peer-focus:px-1 peer-focus:-top-3.5 peer-focus:left-3 ${value.length > 0 ? "px-1 -top-3.5 left-3" : `top-4 ${beforeIcon ? "left-13" : "left-4"}`} transition-all`}>
                    {label}
                </label>
                {state === "error" && (
                    <>
                        <div className={`absolute right-8 p-3`}>{<Svg iconID="error-input" className="w-6 h-6 text-rose-400" />}</div>
                        <div className="absolute bottom-0 inset-x-0 w-full h-0.5 bg-rose-400 rounded-full scale-0 animate-full-scale"></div>
                    </>
                )}
                {state === "success" && (
                    <>
                        <div className={`absolute right-8 p-3`}>{<Svg iconID="check-circle" className="w-6 h-6 text-teal-600" />}</div>
                        <div className="absolute bottom-0 inset-x-0 w-full h-0.5 bg-teal-500 rounded-full scale-0 animate-full-scale"></div>
                    </>
                )}
                <button type="button" className="absolute right-1 p-2 rounded-full text-[#49454F] transition-all hover:bg-slate-50" onClick={showPasswordHandler}>
                    <Svg iconID={inputType === "password" ? "eye" : "eye-slash"} className="w-5 h-5" />
                </button>
            </div>
            {state === "error" && <p className={`text-rose-500 mt-1 text-xs xs:text-sm transition-all visible opacity-100`}>{errorMessage}</p>}
        </div>
    );
});
