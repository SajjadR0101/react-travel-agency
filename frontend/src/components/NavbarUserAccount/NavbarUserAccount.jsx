import React, { memo } from "react";
import ImageCover from "../ImageCover/ImageCover";
import TextByIcon from "../TextByIcon/TextByIcon";
import LinkByIcon from "../LinkByIcon/LinkByIcon";
import { useNavigate } from "react-router-dom";
import QuestionModal from "../QuestionModal/QuestionModal";
import useModal from "../../hooks/useModal";
import UserProfile from "../UserProfile/UserProfile";
import ActiveDot from "../ActiveDot/ActiveDot";

export default memo(function NavbarUserAccount({ userInfo, onLogOut }) {
    const [isShowLogOutModal, showLogOutModal, onClose] = useModal();

    const navigate = useNavigate();

    const logOutUser = () => {
        onLogOut();
        navigate("/");
    };

    const logOutHandler = () => {
        showLogOutModal();
    };

    return (
        <>
            <div className="absolute top-full right-4 pt-2 cursor-auto invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all delay-100 z-10">
                <div className="bg-white p-8 rounded-xl w-[330px] shadow-box flex flex-col gap-y-6">
                    <div className="flex items-center gap-x-4">
                        <UserProfile src={userInfo?.profile} username={userInfo?.username} />
                        <div className="flex flex-col gap-y-1">
                            <span className="text-base line-clamp-1">{userInfo?.username}</span>
                            <div className="flex items-center gap-x-2">
                                <ActiveDot />
                                <span className="opacity-75 text-sm font-Montserrat">Online</span>
                            </div>
                        </div>
                    </div>
                    <span className="block w-full h-[0.5px] bg-slate-900 opacity-25"></span>
                    <div className="font-MontserratMedium space-y-4">
                        <LinkByIcon to="/account" className="flex items-center justify-between gap-x-4" iconID="chevron-right" iconClasses="w-4 h-4">
                            <TextByIcon text="My account" className="flex items-center gap-x-2" iconID="user" iconClasses="w-4.5 h-4.5" />
                        </LinkByIcon>

                        <LinkByIcon to="/account/payments" className="flex items-center justify-between gap-x-4" iconID="chevron-right" iconClasses="w-4 h-4">
                            <TextByIcon text="Payments" className="flex items-center gap-x-2" iconID="payment" iconClasses="w-4.5 h-4.5" />
                        </LinkByIcon>

                        <LinkByIcon to="/account" className="flex items-center justify-between gap-x-4" iconID="chevron-right" iconClasses="w-4 h-4">
                            <TextByIcon text="Settings" className="flex items-center gap-x-2" iconID="settings" iconClasses="w-4.5 h-4.5" />
                        </LinkByIcon>
                    </div>
                    <span className="block w-full h-[0.5px] bg-slate-900 opacity-25"></span>
                    <div className="font-MontserratMedium space-y-4">
                        <LinkByIcon to="/account#" className="flex items-center justify-between gap-x-4" iconID="chevron-right" iconClasses="w-4 h-4">
                            <TextByIcon text="Support" className="flex items-center gap-x-2" iconID="support" iconClasses="w-4.5 h-4.5" />
                        </LinkByIcon>

                        <div className="flex items-center justify-between gap-x-4 cursor-pointer" onClick={logOutHandler}>
                            <TextByIcon text="logout" className="flex items-center gap-x-2" iconID="logout" iconClasses="w-4.5 h-4.5" />
                        </div>
                    </div>
                </div>
            </div>
            <QuestionModal message="You sure to logout from your account?" isShow={isShowLogOutModal} onClose={onClose} onAccept={logOutUser} />
        </>
    );
});
