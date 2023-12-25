import React, { useContext } from "react";
import ImageCover from "../ImageCover/ImageCover";
import ProductBoxReview from "../ProductBoxReview/ProductBoxReview";
import Button from "../Button/Button";
import AuthContext from "../../context/AuthContext";

export default function BookingDetaileBox({ flightName = "", hotelName = "", company = "", cover = null, price = null, score = null, onClick, isLoading }) {
    const authContext = useContext(AuthContext);
    const isLogin = authContext.isLoggedIn;

    return (
        <div className="bg-white rounded-2xl shadow-box p-6">
            <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-start">
                <ImageCover src={cover} wrapperClassName="w-full sm:w-32 h-48 sm:h-32 rounded-xl overflow-hidden shrink-0" />
                <div className="flex flex-col items-center sm:items-start gap-y-4">
                    <div className="flex flex-col gap-y-1">
                        <span className="font-MontserratMedium text-sm text-slate-900/75 line-clamp-1">{company || "Economy"}</span>
                        <span className="text-lg font-MontserratSemiBold line-clamp-2">{flightName || hotelName}</span>
                    </div>
                    <ProductBoxReview score={score} reviewsCount={123} />
                </div>
            </div>
            <span className="block my-4 py-4 border-y  border-slate-200 font-MontserratMedium text-xs text-center sm:text-base">
                Your booking is protected by <span className="font-MontserratBold">golobe</span>
            </span>
            <div>
                <span className="font-TradeGothic font-bold">Price Details</span>
                <div className="space-y-4 mt-4 child:text-sm child:sm:text-base">
                    <div className="flex items-center justify-between">
                        <span>Base Fare</span>
                        <span className="font-MontserratSemiBold">${price}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span>Discount</span>
                        <span className="font-MontserratSemiBold">$0</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span>Taxes</span>
                        <span className="font-MontserratSemiBold">$15</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span>Service Fee</span>
                        <span className="font-MontserratSemiBold">$65</span>
                    </div>
                    <span className="block w-full h-px bg-slate-200"></span>
                    <div className="flex items-center justify-between">
                        <span>Total</span>
                        <span className="font-MontserratSemiBold">${price + 15 + 65}</span>
                    </div>
                </div>
            </div>
            <div className="mt-8">
                <Button title="Buy Now" isLoading={isLoading} disabled={isLoading} size="lg" className="w-full" onClick={onClick} disabled={!isLogin} />
            </div>
        </div>
    );
}
