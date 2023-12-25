import React from "react";
import ImageCover from "../ImageCover/ImageCover";

export default function LandingTripPlanBox({ imageSrc, title, tags }) {
    return (
        <div className="flex items-center gap-x-4 p-4 rounded-xl bg-white shadow-card">
            <ImageCover src={imageSrc} alt={title} wrapperClassName="w-[90px] h-[90px] rounded-md overflow-hidden shrink-0" />
            <div className="flex flex-col gap-y-2 text-slate-900">
                <span className="font-MontserratSemiBold opacity-70">{title}</span>
                <div className="text-xs sm:text-xxs md:text-xs xl:text-sm font-MontserratMedium flex items-center flex-wrap gap-x-2">
                    {tags.map((tag, index) => (
                        <>
                            <span>{tag}</span>
                            {index + 1 !== tags.length && <span className="w-1 h-1 rounded-full bg-current"></span>}
                        </>
                    ))}
                </div>
            </div>
        </div>
    );
}
