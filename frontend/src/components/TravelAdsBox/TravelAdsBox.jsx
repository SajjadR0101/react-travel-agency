import React from "react";

export default function TravelAdsBox() {
    return (
        <div className="col-span-4 order-1 lg:order-none lg:col-span-2 row-span-2 bg-primary p-6 rounded-2xl flex flex-col justify-between">
            <div className="text-slate-900">
                <div className="flex flex-col xs:flex-row justify-between items-start gap-x-2 gap-y-4">
                    <h4 className="font-TradeGothic font-bold text-center xs:text-start text-3xl/10 sm:text-5xl/[54px] xs:max-w-[360px]">Backpacking Sri Lanka</h4>
                    <div className="p-2 rounded-lg bg-white child:block text-center w-full xs:w-auto">
                        <span className="text-sm">From</span>
                        <span className="font-MontserratSemiBold text-xl mt-1">$700</span>
                    </div>
                </div>
                <p className="mt-6 text-sm">Traveling is a unique experience as it's the best way to unplug from the pushes and pulls of daily life. It helps us to forget about our problems, frustrations, and fears at home. During our journey, we experience life in different ways. We explore new places, cultures, cuisines, traditions, and ways of living.</p>
            </div>
            <Button title="Book Flight" size="lg" className="block bg-white hover:bg-white mt-28 lg:mt-0" />
        </div>
    );
}
