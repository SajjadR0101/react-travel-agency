import React from "react";
import Button from "../Button/Button";
import Svg from "../Svg/Svg";
import ImageCover from "../ImageCover/ImageCover";
import ProductBoxReview from "../ProductBoxReview/ProductBoxReview";
import LikeButton from "../LikeButton/LikeButton";
import { minutesToHourFormat, timeFormater } from "../../utils/functions";

export default function FlightProductBox({ id, cover, price, fromCity: from, toCity: to, departTime, returnTime, flyTime, score, company }) {
    return (
        <div className="bg-white shadow-card rounded-2xl overflow-hidden flex flex-col lg:flex-row">
            <ImageCover src={cover} alt="cover" wrapperClassName="w-full lg:w-[500px] h-[250px] sm:h-[400px] lg:max-h-[308px] flex-center overflow-hidden" />
            <div className="flex flex-col gap-y-4 w-full p-6">
                <div className="flex items-center justify-between text-sm font-MontserratMedium">
                    <ProductBoxReview score={score} reviewsCount={54} />
                    <div className="flex flex-col items-end">
                        <span className="text-xs text-slate-900/75 font-MontserratMedium hidden xs:block">starting from</span>
                        <span className="font-MontserratBold text-error text-2xl">${price}</span>
                    </div>
                </div>
                <div className="font-MontserratSemiBold space-y-4">
                    <div className="flex items-start gap-x-3">
                        <input type="checkbox" className="w-6 h-6 accent-primary hidden sm:block" />
                        <div className="flex flex-col xs:flex-row gap-y-2 items-center xs:items-start justify-between sm:justify-start gap-x-10 w-full sm:w-auto">
                            <div className="text-center xs:text-start">
                                <div className="flex items-center gap-x-2">
                                    <span>{timeFormater(departTime)}</span>
                                    <span>-</span>
                                    <span>{timeFormater(returnTime)}</span>
                                </div>
                                <span className="block mt-1 font-Montserrat opacity-40 text-sm">{company}</span>
                            </div>
                            <span className="opacity-75 text-sm hidden sm:inline">non stop</span>
                            <div className="text-center xs:text-end sm:text-start">
                                <span className="opacity-75">{minutesToHourFormat(flyTime)}</span>
                                <span className="block mt-1 font-Montserrat opacity-40 text-sm">
                                    {from}-{to}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="hidden sm:flex items-start gap-x-3">
                        <input type="checkbox" className="w-6 h-6 accent-primary" />
                        <div className="flex items-start gap-x-10">
                            <div>
                                <div className="flex items-center gap-x-2">
                                    <span>{timeFormater(departTime)}</span>
                                    <span>-</span>
                                    <span>{timeFormater(returnTime)}</span>
                                </div>
                                <span className="block mt-1 font-Montserrat opacity-40 text-sm">{company}</span>
                            </div>
                            <span className="opacity-75 text-sm">non stop</span>
                            <div>
                                <span className="opacity-75">{minutesToHourFormat(flyTime)}</span>
                                <span className="block mt-1 font-Montserrat opacity-40 text-sm">
                                    {from}-{to}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <span className="block h-[0.5px] w-full bg-current opacity-25"></span>
                <div className="flex gap-x-4">
                    <LikeButton productID={id} />
                    <Button title="View Details" size="lg" flexible to={`/flights/${id}`} />
                </div>
            </div>
        </div>
    );
}
