import React from "react";
import Button from "../Button/Button";

export default function SectionHead({ title, subTitle = null, btnTitle = null, to = null }) {
    return (
        <div className="flex flex-col text-center sm:text-start sm:flex-row justify-between items-center gap-x-2 gap-y-4">
            <div className="flex flex-col gap-y-4">
                <h3 className="text-black font-MontserratSemiBold text-2xl sm:text-3xl">{title}</h3>
                {subTitle && <p className="text-slate-900 max-w-[850px] opacity-75 text-sm sm:text-base">{subTitle}</p>}
            </div>
            {btnTitle && <Button title={btnTitle} to={to} size="md" outline />}
        </div>
    );
}
