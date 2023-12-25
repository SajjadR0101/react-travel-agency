import React, { memo } from "react";

export default memo(function Table({ children }) {
    return <table className="w-full text-sm text-left rtl:text-right text-gray-500">{children}</table>;
});
