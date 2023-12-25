import React from "react";
import Svg from "../Svg/Svg";

export default function AddNewCartBox({ className = '', onClick }) {
    return (
        <div className={`add-new-cart h-40 sm:h-60 border-2 border-dashed border-primary rounded-2xl flex-center cursor-pointer ${className}`} onClick={onClick}>
            <div className="flex flex-col items-center gap-y-2.5">
                <button>
                    <Svg iconID="circle-add" className="w-16 h-16 text-primary" />
                </button>
                <span className="text-sm font-MontserratMedium opacity-75">Add a new card</span>
            </div>
        </div>
    );
}
