import React, { useState } from "react";
import TextByIcon from "../TextByIcon/TextByIcon";
import SearchForFlightAndHotelForm from "../SearchForFlightAndHotelForm/SearchForFlightAndHotelForm";
import Svg from "../Svg/Svg";
import Button from "../Button/Button";
import HotelSearchForm from "../HotelSearchForm/HotelSearchForm";
import FlightsSearchForm from "../FlightsSearchForm/FlightsSearchForm";

export default function SearchForFlightAndHotelBox({ title }) {
    const [isHotel, setIsHotel] = useState(false);

    return (
        <div className="bg-white px-8 pb-8 pt-4 rounded-2xl shadow-normal">
            <div className="relative items-center text-slate-900 gap-x-8 flex justify-center sm:justify-start">
                <TextByIcon text="Find Flight" to="#" className="hidden sm:flex items-center gap-x-1 h-12 cursor-pointer" iconID="airplane" iconClasses="w-6 h-6" onClick={() => setIsHotel(false)} />
                <div className="sm:hidden" onClick={() => setIsHotel(false)}>
                    <Svg iconID="airplane" className={`w-8 h-8 ${isHotel ? "text-slate-900" : "text-primary"}`} />
                </div>
                <span className="block w-px h-12 bg-slate-200"></span>
                <TextByIcon text="Find Stays" to="#" className="hidden sm:flex items-center gap-x-1 h-12 cursor-pointer" iconID="bed" iconClasses="w-6 h-6" onClick={() => setIsHotel(true)} />
                <div className="sm:hidden" onClick={() => setIsHotel(true)}>
                    <Svg iconID="bed" className={`w-8 h-8 ${isHotel && "text-primary"}`} />
                </div>
                <span className={`hidden sm:inline-block rounded-full absolute bottom-0 left-0 translate-y-5 bg-primary h-[5px] w-[112px] transition-all duration-300 ${isHotel && "left-[181px]"}`}></span>
            </div>
            <div className="mt-12">
                <SearchForFlightAndHotelForm
                    btn={
                        <div>
                            {!isHotel && <Button title="Show Filghts" to='/flights/all' className="animate-loadByOpacity" size="lg" beforeIcon={<Svg iconID="paper-plane" className="w-5 h-5 -rotate-45" />} />}
                            {isHotel && <Button title="Show Hotels" to='/hotels/all' className="animate-loadByOpacity" size="lg" beforeIcon={<Svg iconID="building" className="w-5 h-5" />} />}
                        </div>
                    }
                >
                    <div>
                        {!isHotel && <FlightsSearchForm className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-6 animate-loadByOpacity" />}
                        {isHotel && <HotelSearchForm className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-9 gap-6 animate-loadByOpacity" />}
                    </div>
                </SearchForFlightAndHotelForm>
            </div>
        </div>
    );
}
