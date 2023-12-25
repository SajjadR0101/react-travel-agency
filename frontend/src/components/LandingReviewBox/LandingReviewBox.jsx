import React from "react";
import Button from "../Button/Button";
import Svg from "../Svg/Svg";
import ImageCover from "../ImageCover/ImageCover";

export default function LandingReviewBox({ imageSrc, title, desc }) {
    return (
        <div className="bg-white p-6 rounded-3xl shadow-box text-slate-900 relative">
            <h5 className="font-TradeGothic font-bold text-xl sm:text-2xl line-clamp-2 h-16">{title}</h5>
            <p className="opacity-50 mt-4 mb-3 text-sm font-MontserratMedium line-clamp-2">{desc}</p>
            <div className="flex justify-end">
                <Button title="View more" transparent />
            </div>
            <div className="mt-4 text-yellow-300 flex gap-x-3">
                <Svg iconID="star-fill" className="w-6 h-6" />
                <Svg iconID="star-fill" className="w-6 h-6" />
                <Svg iconID="star-fill" className="w-6 h-6" />
                <Svg iconID="star-fill" className="w-6 h-6" />
                <Svg iconID="star-fill" className="w-6 h-6" />
            </div>
            <div className="mt-5">
                <span className="block font-TradeGothic font-bold text-sm">Olga</span>
                <span className="block mt-1 opacity-50 font-MontserratMedium text-xs">Weave Studios – Kai Tak</span>
                <div className="mt-3 flex items-center gap-x-2">
                    <Svg iconID="google" className="w-6 h-6" />
                    <span className="font-TradeGothic font-bold text-xs opacity-40">Google</span>
                </div>
            </div>
            <ImageCover src={imageSrc} alt={title} wrapperClassName="h-[140px] sm:h-[220px] w-full rounded-xl sm:rounded-2xl overflow-hidden mt-10" />
            <div className="-z-10 absolute inset-0 rounded-3xl bg-primary opacity-40 translate-x-6 translate-y-6"></div>
        </div>
    );
}
