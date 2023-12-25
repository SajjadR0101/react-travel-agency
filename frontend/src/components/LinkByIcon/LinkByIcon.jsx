import React, { memo } from "react";
import Svg from "../Svg/Svg";
import { Link } from "react-router-dom";

export default memo(function LinkByIcon({ text = '', to = '', className = '', iconID = '', iconClasses = '', onClick, children }) {
    return (
        <Link to={to} className={className} onClick={onClick}>
            {children}
            {iconID && <Svg iconID={iconID} className={iconClasses} />}
            {!children && text}
        </Link>
    );
})
