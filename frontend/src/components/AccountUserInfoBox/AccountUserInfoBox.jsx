import React, { memo } from "react";
import Button from "../Button/Button";
import Svg from "../Svg/Svg";

export default memo(function AccountUserInfoBox({ title, subTitle, changeOnClick, leftComponent = null }) {
    return (
        <div className="text-slate-900 text-center sm:text-start flex flex-col sm:flex-row justify-between items-center gap-y-2">
            <div className="flex flex-col gap-y-2">
                <span className="opacity-75 text-sm">{subTitle}</span>
                <span className="font-MontserratSemiBold text-base line-clamp-1">{title}</span>
            </div>
            <div className="flex flex-wrap justify-center sm:justify-end gap-2">
                {leftComponent && leftComponent}
                <Button title="Change" size="lg" outline beforeIcon={<Svg iconID="edit" className="w-5 h-5" />} onClick={changeOnClick} />
            </div>
        </div>
    );
});
