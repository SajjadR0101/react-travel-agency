import React, { useCallback, useEffect, useRef, useState } from "react";
import Svg from "../Svg/Svg";
import validator from "../../validator/validator";
import DatePicker from "./DatePicker";
import MobileDatePicker from "./MobileDatePicker";

export default function DateInput({ type = "text", label = "", id = "", init = "", errorMessage = "Enter a valid date ( example: Dec 8, 2023 )", wrapperClassName = "", validations, onInput = null, children, customProps = {}, buttonIconID = "date", orientation = "portrait" }) {
    const [value, setValue] = useState("");
    const isValid = useRef(false);
    const [state, setState] = useState("");
    const isFirstRender = useRef(true);
    const [isShowChildren, setIsShowChildren] = useState(false);

    const stateHandler = () => (value.length === 0 ? "normal" : ["error", "success"][+isValid.current]);

    useEffect(() => {
        setValue(init);
        setState(stateHandler);
    }, [init]);

    useEffect(() => {
        isValid.current = onInput && validator(validations, value);

        if (isFirstRender.current) {
            onInput && onInput(id, value, setValue, validator(validations, value));
            isFirstRender.current = false;
        } else {
            onInput && onInput(id, value, null, validator(validations, value));
            state && setState(stateHandler);
        }
    }, [value]);

    const onSubmitChildren = (result) => {
        setValue(result);
        setIsShowChildren(false);
    };

    return (
        <div className={wrapperClassName}>
            <div className={`relative flex items-center gap-x-1 h-14`}>
                <input
                    type={type}
                    id={id}
                    value={value}
                    {...customProps}
                    onChange={(e) => setValue(e.target.value)}
                    className={`pl-4 py-2 rounded peer relative outline-none h-full w-full text-[#1C1B1F] border border-slate-500`}
                    onBlur={() => {
                        !state && setState(stateHandler);
                    }}
                    onFocus={() => {
                        setIsShowChildren(true);
                        !value && state && setState("");
                    }}
                />
                <label htmlFor={id} className={`absolute pointer-events-none bg-white peer-focus:px-1 peer-focus:-top-3.5 peer-focus:left-3 ${value.length > 0 ? "px-1 -top-3.5 left-3" : `top-4 left-4`} transition-all`}>
                    {label}
                </label>
                {document.body.clientWidth > 640 ? (
                    <div className={`absolute top-full mt-1 left-0 z-30 transition-all ${isShowChildren ? "opacity-100 visible" : "opacity-0 invisible"}`}>
                        <DatePicker orientation={orientation} onSubmit={onSubmitChildren} onCancel={useCallback(() => setIsShowChildren(false), [])} />
                    </div>
                ) : (
                    <MobileDatePicker isShow={isShowChildren} onSubmit={onSubmitChildren} onCancel={useCallback(() => setIsShowChildren(false), [])} />
                )}
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
                <button type="button" className="absolute right-1 p-2 rounded-full transition-all hover:bg-slate-50" onClick={() => setIsShowChildren((prevState) => !prevState)}>
                    <Svg iconID={buttonIconID} className="w-5 h-5 text-slate-500" />
                </button>
            </div>
            {state === "error" && <p className={`text-rose-500 mt-1 text-xs xs:text-smtransition-all visible opacity-100`}>{errorMessage}</p>}
        </div>
    );
}
