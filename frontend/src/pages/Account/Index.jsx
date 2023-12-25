import React, { useContext, useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AccountIcons from "../../components/Icons/AccountIcons";
import Svg from "../../components/Svg/Svg";
import ImageCover from "../../components/ImageCover/ImageCover";
import HeaderItemsSelector from "../../components/HeaderItemsSelector/HeaderItemsSelector";
import AuthContext from "../../context/AuthContext";
import Toast from "../../components/Toast/Toast";
import useToast from "../../hooks/useToast";
import useFetch from "../../hooks/useFetch";
import PageTransition from "../../components/PageTransition/PageTransition";
import FileInput from "../../components/Form/FileInput";
import useUploader from "../../hooks/useUploader";
import ToastContext from "../../context/ToastContext";
import AccountHeader from "../../components/AccountHeader/AccountHeader";

export default function Index() {
    const [isShowToast, showToast, toastOptions] = useToast();

    const authContext = useContext(AuthContext);

    const userInfo = authContext?.userInfo;

    const [changeUserProfileAction] = useFetch({
        url: "https://node-travel-agency.liara.run/api/users/",
        method: "PUT",
        contentType: true,
        authorization: true,
        successCallback: () => {
            showToast("success", "Your profile set successfully.");
            authContext.refreshUserInfo();
        },
    });

    const [profile, setProfileHandler] = useUploader(
        (res) => changeUserProfileAction({ profile: res }),
        () => showToast("warning", "Type of profile only png or jpeg.")
    );

    const onChangeProfile = (event) => {
        setProfileHandler(event, 250, 250);
    };

    return (
        <PageTransition>
            <AccountIcons />
            <ToastContext.Provider
                value={{
                    isShowToast,
                    showToast,
                    toastOptions,
                }}
            >
                <header className="mt-4 sm:mt-16">
                    <div className="container">
                        <div className="h-48 sm:h-[400px] relative flex justify-center sm:justify-end items-start sm:items-end rounded-2xl bg-user_panel text-slate-900 p-6">
                            <FileInput className="hidden sm:flex-center h-12 shrink-0 gap-x-1 py-2 px-4 font-MontserratMedium text-sm text-slate-900 bg-primary hover:bg-primary-hover ring-offset-1 ring-primary focus:ring-1 focus:bg-[#A5EBD3] disabled:bg-[#D2D1D3] disabled:text-[#8F8C91] rounded transition-all" id="profile" title="Upload new profile" onChange={onChangeProfile} />
                            <div className="absolute left-0 right-0 top-full mx-auto flex flex-col items-center">
                                <div className="relative w-40 h-40 -mt-24">
                                    {userInfo?.profile ? <ImageCover src={userInfo?.profile} alt="user-profile" wrapperClassName="w-40 h-40 border-4 border-error rounded-full overflow-hidden" /> : <div className="w-40 h-40 border-4 border-error bg-primary text-white font-MontserratMedium text-7xl flex-center rounded-full overflow-hidden">{userInfo?.username[0].toUpperCase()}</div>}
                                    <span className="flex-center p-2.5 bg-error rounded-full absolute right-2 bottom-0">
                                        <Svg iconID="pen" className="w-6 h-6" />
                                    </span>
                                </div>
                                <div className="flex flex-col gap-y-2 mt-6 text-center">
                                    <span className="font-MontserratSemiBold text-2xl">{userInfo?.username}</span>
                                    <span className="opacity-75 text-sm">{userInfo?.email}</span>
                                </div>
                                <div className="mt-4">
                                    <FileInput className="load-btn gap-x-2 h-12 sm:hidden" id="profile" title="Upload new profile" onChange={onChangeProfile} />
                                </div>
                            </div>
                        </div>
                        <AccountHeader />
                    </div>
                </header>
                <main className="mt-10 mb-[260px]">
                    <Outlet />
                </main>
                <Toast {...toastOptions} isShow={isShowToast} />
            </ToastContext.Provider>
        </PageTransition>
    );
}
