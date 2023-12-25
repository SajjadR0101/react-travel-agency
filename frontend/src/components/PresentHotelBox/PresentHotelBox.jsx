import React from "react";
import TextByIcon from "../TextByIcon/TextByIcon";
import ImageCover from "../ImageCover/ImageCover";
import Svg from "../Svg/Svg";

export default function PresentHotelBox({ hotelName, price, checkInDate, checkOutDate, company, companyCover }) {
    return (
        <div className="py-8 px-6 bg-white rounded-2xl shadow-box">
            <div className="flex items-center justify-between flex-col md:flex-row gap-4">
                <span className="font-TradeGothic font-bold text-base md:text-xl text-center">{hotelName}</span>
                <span className="text-sm text-error font-MontserratBold">
                    <span className="text-2xl">${price}</span>/night
                </span>
            </div>
            <div className="mt-6 px-8 py-4 border border-slate-200 hover:bg-slate-50 rounded-xl flex flex-col md:flex-row text-center md:text-start items-center gap-y-2 gap-x-6">
                <ImageCover src={companyCover} wrapperClassName="h-[46px] overflow-hidden shrink-0" />
                <div className="flex flex-col gap-y-2">
                    <span className="font-TradeGothic font-bold text-xl line-clamp-1">{company}</span>
                    <TextByIcon text="Gümüssuyu Mah. Inönü Cad. No:8, Istanbul 34437" className="flex items-center gap-x-1 text-slate-900/75 text-xs font-MontserratMedium" iconID="location" iconClasses="w-5 h-5 hidden md:inlile-block" />
                </div>
            </div>
            <div className="flex items-center justify-between flex-col xs:flex-row text-center xs:text-start mt-10 gap-4">
                <div className="flex flex-col gap-y-2">
                    <span className="font-MontserratSemiBold text-base xs:text-lg">{checkInDate}</span>
                    <span className="text-sm text-slate-900/60">Check-In</span>
                </div>
                <div className="flex items-center gap-x-6">
                    <span className="hidden md:inline-block h-px w-12 bg-slate-900/75 relative after:absolute after:w-2 after:h-2 after:rounded-full after:bg-current after:inset-y-0 after:m-auto after:left-0"></span>
                    <Svg iconID="hotel" className="w-14 h-14" />
                    <span className="hidden md:inline-block h-px w-12 bg-slate-900/75 relative after:absolute after:w-2 after:h-2 after:rounded-full after:bg-current after:inset-y-0 after:m-auto after:right-0"></span>
                </div>
                <div className="flex flex-col items-end gap-y-2">
                    <span className="font-MontserratSemiBold text-base xs:text-lg">{checkOutDate}</span>
                    <span className="text-sm text-slate-900/60">Check-Out</span>
                </div>
            </div>
        </div>
    );
}
