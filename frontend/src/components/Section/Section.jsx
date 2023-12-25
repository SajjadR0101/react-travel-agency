import React, { memo } from "react";

export default memo(function Section({ children, className }) {
    return <section className={className}>{children}</section>;
});
