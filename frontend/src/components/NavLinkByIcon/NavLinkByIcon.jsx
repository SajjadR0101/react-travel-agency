import React, { memo, useEffect, useRef } from "react";
import Svg from "../Svg/Svg";
import { NavLink } from "react-router-dom";

export default memo(function LinkByIcon({ text = '', to = '', className = '', iconID = '', iconClasses = '', onClick, children }) {

    return (
        <NavLink to={to} className={className} onClick={onClick}>
            {children}
            {iconID && <Svg iconID={iconID} className={iconClasses} />}
            {!children && text}
        </NavLink>
    );
})
