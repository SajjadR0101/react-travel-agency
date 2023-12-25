import React from "react";

export default function FooterMenu({ title, subs }) {
    return (
        <div className="w-[130px] sm:w-[170px]">
            <h4 className="font-TradeGothic font-bold text-sm sm:text-base">{title}</h4>
            <ul className="mt-4 space-y-3 child:text-sm child:font-MontserratMedium child:opacity-70">
                {subs.map((item) => {
                    return (
                        <li key={item}>
                            <a href="#">{item}</a>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
