import React from "react";
import Svg from "../Svg/Svg";
import ImageCover from "../ImageCover/ImageCover";
import { minutesToHourFormat, timeFormater } from "../../utils/functions";

export default function PresentFlightBox({ fromCity: from, toCity: to, departDate, returnDate, departTime, returnTime, flyTime, company, gate, companyCover }) {
    return (
        <div className="py-8 px-6 bg-white rounded-2xl shadow-box">
            <div className="flex justify-between items-center flex-wrap gap-2 mb-6">
                <span className="font-TradeGothic font-bold sm:text-xl">Return {returnDate}</span>
                <span className="text-slate-900/75 sm:text-lg font-MontserratMedium">{minutesToHourFormat(flyTime)}</span>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-x-6 py-4 px-8 text-center xs:text-start rounded-xl border border-slate-200 hover:bg-slate-50">
                    <ImageCover src={companyCover} wrapperClassName="h-[46px] overflow-hidden" />
                    <div className="hidden xs:flex flex-col gap-y-2">
                        <span className="font-TradeGothic font-bold text-xl line-clamp-1">{company}</span>
                        <span className="font-MontserratMedium text-sm text-slate-900/60">{gate}</span>
                    </div>
                </div>
                <div className="flex items-center gap-x-4 xl:gap-x-6 h-12">
                    <Svg iconID="plane-stroke" className="w-6 h-6" />
                    <span className="block h-full w-px bg-slate-200"></span>
                    <Svg iconID="wi-fi" className="w-6 h-6" />
                    <span className="block h-full w-px bg-slate-200"></span>
                    <Svg iconID="scan" className="w-6 h-6" />
                    <span className="block h-full w-px bg-slate-200"></span>
                    <Svg iconID="gift" className="w-6 h-6" />
                    <span className="block h-full w-px bg-slate-200"></span>
                    <Svg iconID="swatch" className="w-6 h-6" />
                </div>
            </div>
            <div className="mt-10 flex-center flex-col xs:flex-row gap-6 sm:gap-x-20">
                <div className="flex flex-col md:flex-row items-center gap-x-4 gap-y-1">
                    <span className="font-MontserratSemiBold text-xl">{timeFormater(departTime)}</span>
                    <span className="font-MontserratMedium text-sm text-slate-900/60">{from}</span>
                </div>
                <div className="flex items-center gap-x-6">
                    <span className="hidden sm:inline-block h-px w-12 bg-slate-900/75 relative after:absolute after:w-2 after:h-2 after:rounded-full after:bg-current after:inset-y-0 after:m-auto after:left-0"></span>
                    <Svg iconID="plane" className="w-12 h-12" />
                    <span className="hidden sm:inline-block h-px w-12 bg-slate-900/75 relative after:absolute after:w-2 after:h-2 after:rounded-full after:bg-current after:inset-y-0 after:m-auto after:right-0"></span>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-x-4 gap-y-1">
                    <span className="font-MontserratSemiBold text-xl">{timeFormater(returnTime)}</span>
                    <span className="font-MontserratMedium text-sm text-slate-900/60">{to}</span>
                </div>
            </div>
        </div>
    );
}
