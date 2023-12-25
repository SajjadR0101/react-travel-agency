import { createContext } from "react";

const ToastContext = createContext({
    isShowToast: false,
    showToast: () => {},
    toastOptions: null
})

export default ToastContext;