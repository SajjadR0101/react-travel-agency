import React, { memo } from "react";
import Input from "../Form/Input";
import Button from "../Button/Button";
import Svg from "../Svg/Svg";

export default memo(function SearchForFlightAndHotelForm({ children, btn = "" }) {
    return (
        <form>
            {children}
            <div className="text-bg-slate-900 mt-8 flex flex-wrap justify-end items-center gap-6">
                <Button title="Add Promo Code" beforeIcon={<Svg iconID="plus" className="w-5 h-5" />} transparent />
                {btn}
            </div>
        </form>
    );
});
