import React from "react";
import ImageCover from "../ImageCover/ImageCover";

export default function RecentSearchBox({ imageSrc, title, subTitle }) {
    return (
        <div className="flex items-center gap-x-4 p-4 rounded-xl">
            <ImageCover src={imageSrc} alt={title} wrapperClassName="w-[90px] h-[90px] rounded-md overflow-hidden shrink-0" />
            <div className="flex flex-col gap-y-2 text-slate-900">
                <span className="font-MontserratSemiBold">{title}</span>
                <span className="text-xs opacity-75">{subTitle}</span>
            </div>
        </div>
    );
}
