import React from "react";
import Button from "../Button/Button";
import Svg from "../Svg/Svg";
import ImageCover from "../ImageCover/ImageCover";
import HotelProductImageCount from "../HotelProductImageCount/HotelProductImageCount";
import TextByIcon from "../TextByIcon/TextByIcon";
import ProductStar from "../ProductStar/ProductStar";
import ProductBoxReview from "../ProductBoxReview/ProductBoxReview";
import LikeButton from "../LikeButton/LikeButton";

export default function HotelProductBox({ id, hotelName, price, cover, score, rooms }) {
    return (
        <div className="bg-white shadow-card rounded-2xl overflow-hidden flex flex-col lg:flex-row">
            <ImageCover src={cover} alt="cover" wrapperClassName="relative w-full lg:w-[500px] h-[250px] sm:h-[400px] lg:max-h-[308px] flex-center overflow-hidden" absoluteElem={<HotelProductImageCount count={9} />} />
            <div className="flex flex-col gap-y-6 w-full p-6">
                <div className="flex flex-col sm:flex-row justify-between gap-x-6">
                    <div>
                        <h3 className="font-TradeGothic font-bold text-xl h-[50px] mb-4 line-clamp-2 text-center xs:text-start">{hotelName}</h3>
                        <div className="flex flex-col gap-y-3 items-center xs:items-start">
                            <span className="text-sm text-error font-MontserratBold sm:hidden">
                                <span className="text-2xl">${price}</span>/night
                            </span>
                            <TextByIcon text="Gümüssuyu Mah. Inönü Cad. No:8, Istanbul 34437" className="hidden xs:flex items-center gap-x-1 text-slate-900/75 text-xs font-MontserratMedium" iconID="location" iconClasses="w-5 h-5" />
                            <div className="flex flex-col xs:flex-row items-center gap-x-8 gap-y-4">
                                <ProductStar starCount={Math.ceil(score)} product="Hotel" />
                                <TextByIcon text={`${rooms}+ rooms`} className="flex items-end gap-x-1 text-xs font-MontserratMedium leading-3 h-3" iconID="coffee" iconClasses="w-4 h-4 fill-green-black" />
                            </div>
                            <ProductBoxReview score={score} reviewsCount={104} />
                        </div>
                    </div>
                    <div className="hidden sm:flex flex-col gap-y-0.5">
                        <span className="text-xs text-slate-900/75 font-MontserratMedium self-start">starting from</span>
                        <span className="text-sm text-error font-MontserratBold">
                            <span className="text-2xl">${price}</span>/night
                        </span>
                        <span className="text-xs text-slate-900/75 font-MontserratMedium self-end">excl. tax</span>
                    </div>
                </div>
                <span className="block h-[0.5px] w-full bg-current opacity-25"></span>
                <div className="flex gap-x-4">
                    <LikeButton productID={id} isHotel />
                    <Button title="View Details" size="lg" flexible to={`/hotels/${id}`} />
                </div>
            </div>
        </div>
    );
}
