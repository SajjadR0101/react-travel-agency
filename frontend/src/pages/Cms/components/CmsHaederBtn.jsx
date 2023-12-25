import React, { memo } from "react";
import Svg from "../../../components/Svg/Svg";

export default memo(function CmsHaederBtn({ iconID = "", badge = null, badgeTitle = "", active = false }) {
    return (
        <button className={`relative p-4 rounded-full transition-all ${active ? "bg-indigo-100/50" : "hover:bg-indigo-100/50 group"}`}>
            <Svg iconID={iconID} className={`w-6 h-6 ${active ? "text-blue-500" : "text-slate-400 group-hover:text-blue-500"}`} />
            {badge && <span className="absolute block w-5 h-5 rounded-full -right-1 -top-1 bg-blue-500 flex-center text-xs font-MontserratMedium text-white">{badgeTitle}</span>}
        </button>
    );
});
