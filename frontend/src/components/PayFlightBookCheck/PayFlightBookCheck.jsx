import React, { useState } from "react";
import CustomCheckBox from "../CustomCheckBox/CustomCheckBox";

export default function PayFlightBookCheck() {
    const [isActiveFirst, setIsActiveFirst] = useState(true);

    return (
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-box space-y-4">
            <CustomCheckBox isActive={isActiveFirst} onClick={() => setIsActiveFirst(true)}>
                <div className="flex flex-col gap-y-2">
                    <span className="font-TradeGothic font-bold text-sm xs:text-base line-clamp-1">Pay in full</span>
                    <span className="text-xs xs:text-sm line-clamp-2">Pay the total and you are all set</span>
                </div>
            </CustomCheckBox>
            <CustomCheckBox isActive={!isActiveFirst} onClick={() => setIsActiveFirst(false)}>
                <div className="flex flex-col gap-y-2">
                    <span className="font-TradeGothic font-bold text-sm xs:text-base line-clamp-1">Pay part now, part later</span>
                    <span className="text-xs xs:text-sm line-clamp-2">Pay $207.43 now, and the rest ($207.43) will be automatically charged to the same payment method on Nov 14, 2022. No extra fees.</span>
                </div>
            </CustomCheckBox>
        </div>
    );
}
