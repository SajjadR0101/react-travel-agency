import React from "react";
import { Link } from "react-router-dom";
import Svg from "../Svg/Svg";

export default function Breadcrumb({ items }) {
    return (
        <div className="flex items-center gap-x-1 sm:gap-x-2 font-MontserratMedium text-xs sm:text-sm">
            {items.map((item, index) => {
                const isLatest = index + 1 === items.length
                return (
                    <>
                        <Link to={item.to} className={!isLatest ? 'text-error shrink-0' : 'line-clamp-1'}>{item.title}</Link>
                        {!isLatest && <Svg iconID="chevron-right" className="w-4 h-4" />}
                    </>
                );
            })}
        </div>
    );
}
