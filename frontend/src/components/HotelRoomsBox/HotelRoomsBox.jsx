import React from "react";
import ImageCover from "../ImageCover/ImageCover";
import Button from "../Button/Button";

export default function HotelRoomsBox({ title, price, cover }) {
    return (
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4 font-MontserratMedium">
            <div className="flex flex-col lg:flex-row items-center gap-4 text-center">
                <ImageCover src={cover} wrapperClassName="w-32 lg:w-20 h-32 lg:h-20 overflow-hidden rounded-md" />
                <span>{title}</span>
            </div>
            <div className="flex items-center gap-x-10">
                <span className="text-sm font-MontserratBold">
                    <span className="text-2xl">${price}</span>/night
                </span>
                <Button title='Book Now' outline size='lg' className='min-w-[150px]' />
            </div>
        </div>
    );
}
