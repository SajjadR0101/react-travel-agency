import React, { useEffect, useRef, useState } from "react";
import Svg from "../Svg/Svg";

export default function FilterProductItem({ children, title }) {
    const [isOpen, setIsOpen] = useState(true)
    const toggleRef = useRef();

    const toggleChildrenItems = () => {
        setIsOpen(prevState => !prevState)
    };

    useEffect(() => {
        toggleRef.current.style.height = isOpen ? `${toggleRef.current.scrollHeight}px` : '0'
    }, [isOpen])

    return (
        <div>
            <div className="font-MontserratSemiBold flex items-center justify-between cursor-pointer" onClick={toggleChildrenItems}>
                <span>{title}</span>
                <Svg iconID="chevron-down" className={`w-5 h-5 transition-all ${isOpen && 'rotate-180'}`} />
            </div>
            <div ref={toggleRef} className="pt-4 transition-all h-0 overflow-hidden">
                {children}
            </div>
        </div>
    );
}
