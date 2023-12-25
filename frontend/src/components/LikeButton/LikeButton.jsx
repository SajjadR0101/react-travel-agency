import React, { useState } from "react";
import Button from "../Button/Button";
import Svg from "../Svg/Svg";
import useLocalStorage from "../../hooks/useLocalStorage";

export default function LikeButton({ productID, isHotel }) {
    const [likedProducts, setLikedProducts, realTimeAccess] = useLocalStorage(isHotel ? 'favourites-hotel' : 'favourites-flight')
    const [isActive, setIsActive] = useState(() => {
        return likedProducts ? likedProducts.some(id => +id === productID) : false
    });

    const onChangeState = () => {
        const realTimeLikedProducts = realTimeAccess()
        if (isActive) {
            setIsActive(false)
            setLikedProducts([...realTimeLikedProducts].filter(id => +id !== productID))
        } else {
            setIsActive(true)
            realTimeLikedProducts ? setLikedProducts([...realTimeLikedProducts, productID]) : setLikedProducts([productID])
        }
    }

    return (
        <div className="relative" onClick={onChangeState}>
            <Button outline size="lg" beforeIcon={<Svg iconID={isActive ? "heart" : "heart-stroke"} className="w-6 h-6 text-rose-400" />} />
            <Svg iconID="heart" className={`absolute inset-0 m-auto w-6 h-6 text-rose-500 ${isActive ? "animate-scale" : "scale-0 opacity-0"}`} />
        </div>
    );
}
