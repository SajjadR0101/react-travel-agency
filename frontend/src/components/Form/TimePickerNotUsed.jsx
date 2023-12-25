import React, { memo, useState } from "react";

const TimeButton = memo(({ value, title, onClick, active }) => {
    return (
        <button type="button" className={`py-1 px-2 rounded text-xs font-MontserratMedium ${active ? "bg-blue-500 text-white" : "bg-slate-100 hover:bg-slate-200/70"}`} data-value={value} onClick={onClick}>
            {title}
        </button>
    );
});

export default function TimePicker({ onSubmit }) {
    const now = new Date()
    const [hour, setHour] = useState(now.getHours());
    const [minute, setMinute] = useState(now.getMinutes());
    const [isPm, setIsPm] = useState(true);

    const changeHour = event => {
        const value = event.target.value
        parseInt(value) > 12 ? setHour('12') : setHour(value)
    }

    const changeMinutes = event => {
        const value = event.target.value
        parseInt(value) > 59 ? setMinute('59') : setMinute(value)
    }

    return (
        <div className="bg-white shadow-box rounded-md w-[350px] z-30">
            <div className="p-4 flex gap-x-4 items-center child:font-MontserratMedium child:text-lg">
                <input type="text" pattern="[0-9]+" value={hour} onChange={changeHour} className="w-full outline-none border border-slate-400 focus:border-blue-500 rounded py-2 px-3 text-slate-500 text-center" maxLength={2} />
                <span>:</span>
                <input type="text" pattern="[0-9]+" value={minute} onChange={changeMinutes} className="w-full outline-none border border-slate-400 focus:border-blue-500 rounded py-2 px-3 text-slate-500 text-center" maxLength={2} />
            </div>
            <div className="p-4 border-t border-t-slate-100 flex items-center gap-x-4">
                <span className="font-MontserratMedium text-slate-600 w-16">{`${hour.toString().padStart(2, "0")} : ${minute.toString().padStart(2, "0")}`}</span>
                <div className="flex gap-x-1">
                    <TimeButton value="pm" title="pm" active={isPm} onClick={() => setIsPm(true)} />
                    <TimeButton value="am" title="am" active={!isPm} onClick={() => setIsPm(false)} />
                </div>
            </div>
            <div className="p-4">
                <button type="button" className="cms-btn h-10 w-full" onClick={() => onSubmit(`${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")} ${isPm ? "pm" : "am"}`)}>
                    Submit
                </button>
            </div>
        </div>
    );
}
