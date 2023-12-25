import React, { useState } from "react";

export default function useCookie() {
    const [cookie, setCookie] = useState(null);

    const getCookie = () => {
        const cookiesArray = document.cookie.split(";");
        let mainCookie = null;
        cookiesArray.some((item) => {
            if (item.includes("userToken")) {
                mainCookie = item.slice(item.indexOf('=') + 1)
                return true
            }
        });

        setCookie(mainCookie)

        return mainCookie
    };

    const setNewCookie = (expire, userToken) => {
        const date = new Date();
        date.setTime(date.getTime() + expire * 24 * 60 * 60 * 1000);
        document.cookie = `userToken=${userToken};path=/;expires=${date}`;
    };

    const removeCookie = () => {
        const date = new Date();
        date.setTime(date.getTime() - 1 * 24 * 60 * 60 * 1000);
        document.cookie = `userToken=${null};path=/;expires=${date}`;
        setCookie(null)
    }

    return [cookie, getCookie, setNewCookie, removeCookie]
}
