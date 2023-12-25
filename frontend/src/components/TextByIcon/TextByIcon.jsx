import React, { memo } from "react";
import Svg from "../Svg/Svg";

export default memo(function TextByIcon({ text, className, iconID, iconClasses, onClick }) {
    return (
        <span className={className} onClick={onClick}>
            <Svg iconID={iconID} className={iconClasses} />
            {text}
        </span>
    );
});
