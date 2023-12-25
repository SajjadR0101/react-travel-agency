import React, { useEffect, useState } from "react";
import HeaderItemsSelector from "../HeaderItemsSelector/HeaderItemsSelector";
import { useLocation } from "react-router-dom";

export default function AccountHeader() {

    const [defalutPage, setDefaultPage] = useState(0) 

    const location = useLocation()

    useEffect(() => {
        if (location.pathname.includes('/history')) {
            setDefaultPage(1)
        } else if (location.pathname.includes('/payments')) {
            setDefaultPage(2)
        } else {
            setDefaultPage(0)
        }
    }, [location.pathname])

    return (
        <HeaderItemsSelector
            className="mt-60 sm:mt-48"
            selectItems={[
                { title: "Account", to: "" },
                { title: "History", to: "history" },
                { title: "Payments", to: "payments" },
            ]}
            defaultActiveElem={defalutPage}
        />
    );
}
