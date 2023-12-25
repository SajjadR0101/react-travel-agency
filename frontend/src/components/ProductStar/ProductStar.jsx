import React from "react";
import Svg from "../Svg/Svg";

export default function ProductStar({ starCount = 5, product = "" }) {
    return (
        <div className="flex items-center gap-x-1">
            <div className="flex">
                {Array(starCount)
                    .fill(0)
                    .map(() => (
                        <Svg iconID="star-fill" className="w-5 h-5 text-amber-400" />
                    ))}
                {Array(5 - starCount)
                    .fill(0)
                    .map(() => (
                        <Svg iconID="star" className="w-5 h-5 text-amber-400" />
                    ))}
            </div>
            <span className="text-xs font-MontserratMedium leading-3">
                {starCount} Star {product}
            </span>
        </div>
    );
}
