import React, { memo } from "react";

export default memo(function Svg({ iconID, className }) {
    return (
        <svg className={className}>
            <use href={`#${iconID}`}></use>
        </svg>
    );
})
