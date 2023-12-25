import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Svg from "../Svg/Svg";

export default function HeaderItemsSelector({ selectItems = [], className = '', defaultActiveElem = null }) {
    const itemslength = selectItems.length;
    const pointerRef = useRef();
    const activeElem = useRef(1)
    const elementsRef = useRef([])

    const pointerHandler = (e) => {
        activeElem.current = +(e.target.dataset.index || e.target.parentElement.dataset.index)
        const sliceWidth = +getComputedStyle(e.currentTarget).width.replace("px", "") / itemslength;
        const pointerLeft = (activeElem.current - 1) * sliceWidth;

        pointerRef.current.style.left = `${pointerLeft}px`;
    };

    useEffect(() => {
        const element = elementsRef[defaultActiveElem]
        defaultActiveElem && element.click()
    }, [defaultActiveElem])

    return (
        <div className={`py-4 px-2 xs:px-6 relative bg-white h-20 shadow-card flex items-center gap-x-2 xs:gap-x-6 ${className}`} onClick={pointerHandler}>
            {selectItems.map((item, index) => {
                if (!item.subTitle) {
                    return (
                        <>
                            {(item.to || item.to === '') ?
                            <Link to={item.to} ref={el => elementsRef[index] = el} className="w-full leading-[48px] flex-grow flex justify-center sm:justify-start items-center gap-x-2" data-index={index + 1}>{item.iconID && <Svg iconID={item.iconID} className='w-5 h-5' />}{item.title}</Link> :
                            <span onClick={item.onClick} className="w-full cursor-pointer leading-[48px] flex-grow flex items-center gap-x-2" data-index={index + 1}>{item.iconID && <Svg iconID={item.iconID} className='w-5 h-5' />}{item.title}</span>}
                            {index + 1 !== itemslength && <span className="w-px hidden xs:block h-full bg-[#D7E2EE]"></span>}
                        </>
                    );
                }

                return (
                    <>
                        <span onClick={item.onClick} className="w-full h-12 cursor-pointer flex-grow flex flex-col gap-y-1 font-MontserratSemiBold" data-index={index + 1}>{item.title}{<span className="opacity-40 text-sm">{item.subTitle}</span>}</span>
                        {index + 1 !== itemslength && <span className="w-px hidden xs:block h-full bg-[#D7E2EE]"></span>}
                    </>
                ) 
            })}
            <span className="hidden w-1/2 w-1/3 w-1/4"></span>
            <span ref={pointerRef} className={`absolute bottom-0 left-0 bg-primary h-1 transition-all duration-300 ${`w-1/${itemslength}`}`}></span>
        </div>
    );
}
