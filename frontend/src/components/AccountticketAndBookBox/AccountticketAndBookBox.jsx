import React from "react";
import Svg from "../Svg/Svg";
import Button from "../Button/Button";
import ImageCover from "../ImageCover/ImageCover";

export default function AccountticketAndBookBox({ isBooking, cover, departDate, departTime, returnTime, gate, capacity, flyTime, checkInDate, checkOutDate, checkInTime, checkOutTime, rooms }) {
    return (
        <div className="flex flex-col xl:flex-row items-center justify-between gap-y-8 py-8 px-6 shadow-card rounded-2xl">
            <div className="flex flex-col lg:flex-row items-center gap-8 w-full xs:w-auto">
                <ImageCover src={cover} wrapperClassName="w-full xs:w-72 lg:w-32 h-44 xs:h-64 lg:h-32 rounded-lg overflow-hidden border border-primary" />
                <div className="text-slate-900 flex flex-col md:flex-row items-center gap-6 ">
                    <div className="flex flex-col text-center sm:flex-row items-center gap-4">
                        <div className="flex flex-col gap-y-1 sm:gap-y-2">
                            <span className="opacity-75">{isBooking ? "Check-In" : "Depart time"}</span>
                            <span className="font-MontserratSemiBold text-xl">{isBooking ? checkInDate : departTime}</span>
                        </div>
                        <span className="hidden sm:block h-0.5 w-5 bg-slate-900"></span>
                        <div className="flex flex-col gap-y-1 sm:gap-y-2">
                            <span className="opacity-75">{isBooking ? "Check Out" : "Return time"}</span>
                            <span className="font-MontserratSemiBold text-xl">{isBooking ? checkOutDate : returnTime}</span>
                        </div>
                    </div>
                    <span className="block w-full md:w-px h-px md:h-12 bg-[#D7E2EE]"></span>
                    {isBooking ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                            <TicketInfoBox iconID="clock" title="Check-In time" text={checkInTime} />
                            <TicketInfoBox iconID="gate" title="Room no." text={rooms} />
                            <TicketInfoBox iconID="clock" title="Check-Out time" text={checkOutTime} />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                            <TicketInfoBox iconID="date" title="Date" text={departDate} />
                            <TicketInfoBox iconID="gate" title="Gate" text={gate} />
                            <TicketInfoBox iconID="clock" title="Flight time" text={`${flyTime} min`} />
                            <TicketInfoBox iconID="airline" title="Seat no." text={capacity} />
                        </div>
                    )}
                </div>
            </div>
            <div className="text-slate-900 flex gap-x-4">
                <Button title="Download Ticket" size="lg" />
                <Button outline size="lg" beforeIcon={<Svg iconID="chevron-right" className="w-5 h-5" />} />
            </div>
        </div>
    );
}

const TicketInfoBox = ({ iconID, title, text }) => {
    return (
        <div className="flex items-center gap-x-2">
            <div className="w-8 h-8 bg-primary/20 text-primary rounded flex-center">
                <Svg iconID={iconID} className="w-6 h-6" />
            </div>
            <div className="flex flex-col gap-y-1 text-slate-900">
                <span className="font-MontserratSemiBold text-xs opacity-60">{title}</span>
                <span className="font-MontserratMedium text-sm">{text}</span>
            </div>
        </div>
    );
};
