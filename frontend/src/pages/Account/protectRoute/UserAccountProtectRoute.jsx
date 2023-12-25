import React, { useContext, useState } from "react";
import AuthContext from "../../../context/AuthContext";
import PageLoader from "../../../components/PageLoader/PageLoader";
import { Navigate } from "react-router-dom";

export default function UserAccountProtectRoute({ children }) {
    const authContext = useContext(AuthContext)
    const isPendding = authContext.isPendding
    const isLogin = authContext.isLoggedIn

    return (
        <PageLoader isPendding={isPendding}>
            {
                isLogin ? children : <Navigate to='/login' replace />
            }
        </PageLoader>
    )
}
