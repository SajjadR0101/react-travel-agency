import React, { useState } from "react";
import TextByIcon from "../TextByIcon/TextByIcon";
import SearchForFlightAndHotelForm from "../SearchForFlightAndHotelForm/SearchForFlightAndHotelForm";
import Svg from "../Svg/Svg";
import Button from "../Button/Button";

export default function SearchBox({ title, children, btn }) {
    return (
        <div className="bg-white px-8 py-8 rounded-2xl shadow-normal">
            <span className="text-slate-900 font-MontserratSemiBold text-xl">{title}</span>
            <div className="mt-12">
                <SearchForFlightAndHotelForm btn={btn}>{children}</SearchForFlightAndHotelForm>
            </div>
        </div>
    );
}
