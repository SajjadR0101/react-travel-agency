import React from "react";
import PageTransition from "../../components/PageTransition/PageTransition";
import { Outlet, useNavigate } from "react-router-dom";
import AdminPanelIcons from "../../components/Icons/AdminPanelIcons";
import CmsHeader from "./components/CmsHeader";
import GridSystem from "../../components/GridSystem/GridSystem";
import CmsSidebar from "./components/CmsSidebar";
import ToastContext from "../../context/ToastContext";
import useToast from "../../hooks/useToast";
import Toast from "../../components/Toast/Toast";
import Button from "../../components/Button/Button";
import CmsOverlay from "./components/CmsOverlay";

export default function Index() {

    const [isShowToast, showToast, toastOptions] = useToast()

    return (
        <PageTransition>
            <CmsOverlay />
            <ToastContext.Provider value={{
                isShowToast,
                showToast,
                toastOptions
            }}>
                <AdminPanelIcons />
                <main className="mt-8">
                    <div className="container">
                        <CmsHeader />
                        <GridSystem parentClaasName="grid grid-cols-12 gap-x-8 min-h-screen my-4">
                            <CmsSidebar />
                            <div className="col-span-12 2xl:col-span-10">
                                <Outlet />
                            </div>
                        </GridSystem>
                    </div>
                </main>
                <Toast {...toastOptions} isShow={isShowToast} />
            </ToastContext.Provider>
        </PageTransition>
    );
}
