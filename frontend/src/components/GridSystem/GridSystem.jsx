import React, { memo } from "react";

export default memo(function GridSystem({ parentClaasName, children }) {
    return <div className={parentClaasName}>{children}</div>;
})
