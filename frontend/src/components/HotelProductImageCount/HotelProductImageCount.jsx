import React from "react";

export default function HotelProductImageCount({ count }) {
    return <div className="absolute right-2 top-2 p-2 backdrop-blur-sm rounded-lg bg-white/50 text-slate-900/75 text-xs font-MontserratMedium">{count} images</div>;
}
