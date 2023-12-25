import React, { useEffect, useRef, useState } from "react";

export default function useToast(time = 3000) {
    const isFirstrender = useRef(true);
    const [isShow, setIsShow] = useState(false);
    const [toastOptions, setToastOptions] = useState({
        varient: "success",
        message: "",
    });

    const showToast = (varient = "success", message = "") => {
        if (isShow) {
            setIsShow(false);

            const waitForNext = setTimeout(() => {
                clearTimeout(waitForNext);
                setToastOptions({ varient, message });
            }, 300);
        } else {
            setToastOptions({ varient, message });
        }
    };

    const closeToast = () => setIsShow(false);

    useEffect(() => {
        if (isFirstrender.current) {
            isFirstrender.current = false;
            return;
        }

        if (isShow) {
            closeToast();
        }

        setIsShow(true);
        const timeoutID = setTimeout(() => {
            closeToast();
        }, time);

        return () => clearTimeout(timeoutID);
    }, [toastOptions]);

    return [isShow, showToast, { ...toastOptions, onClose: closeToast }];
}
