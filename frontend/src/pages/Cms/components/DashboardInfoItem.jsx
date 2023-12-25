import React from "react";
import Svg from "../../../components/Svg/Svg";
import { Link } from "react-router-dom";

export default function DashboardInfoItem({ title = "", number = 1000, to = "", bgColorClass = "bg-blue-500" }) {
    return (
        <div className={`${bgColorClass} h-44 p-4 flex flex-col text-center justify-between rounded-xl text-white font-MontserratMedium`}>
            <div className="flex items-center justify-between">
                <span>{title}</span>
                <Svg iconID="dots" className="w-6 h-6 opacity-30" />
            </div>
            <span className="text-3xl tracking-wide">{number}</span>
            <div className="flex-center gap-x-2">
                <Link to={to} className="p-2 bg-slate-900/10 rounded-full">
                    <Svg iconID="plus-fill" className="w-5 h-5 text-white" />
                </Link>
                <Link to={to} className="py-2 px-4 bg-slate-900/10 rounded-full text-sm">
                    View All
                </Link>
            </div>
        </div>
    );
}
