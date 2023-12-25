import React, { useContext, useEffect } from "react";
import ImageCover from "../ImageCover/ImageCover";
import TextByIcon from "../TextByIcon/TextByIcon";
import LinkByIcon from "../LinkByIcon/LinkByIcon";
import Svg from "../Svg/Svg";
import AuthContext from "../../context/AuthContext";
import { useLocation, Link } from "react-router-dom";
import UserProfile from "../UserProfile/UserProfile";
import ActiveDot from "../ActiveDot/ActiveDot";
import QuestionModal from "../QuestionModal/QuestionModal";
import useModal from "../../hooks/useModal";
import Button from "../Button/Button";

export default function NavbarMobile({ isOpen, onClose }) {
    const authContext = useContext(AuthContext);

    const userInfo = authContext.userInfo;

    const location = useLocation();

    useEffect(() => {
        onClose();
    }, [location.pathname]);

    const [isShowLogOutModal, showLogOutModal, onCloseModal] = useModal();

    const logOutUser = () => {
        authContext.logOut();
        navigate("/");
    };

    return (
        <>
            <div className={`fixed top-0 bottom-0 -left-[312px] sm:hidden bg-white p-6 w-[280px] shadow-box flex flex-col gap-y-6 z-20 transition-all ${isOpen && "left-0"}`}>
                <div className="absolute right-4 top-4" onClick={onClose}>
                    <Svg iconID="x-mark" className="w-5 h-5 opacity-25" />
                </div>
                <div className={`font-MontserratMedium  w-[90%] flex-col gap-2 ${!authContext.isLoggedIn && !authContext.isPendding ? "flex" : "hidden"}`}>
                    <Link to="/signup" className="load-btn h-12 grow">
                        Sign up
                    </Link>
                    <Button title="Login" size='lg' outline to="/login" className="grow" />
                </div>
                <div className={`hidden items-center gap-x-4 ${authContext.isLoggedIn && "!flex"}`}>
                    {userInfo?.role === "admin" ? (
                        <Link to="/admin-panel/" className="font-MontserratSemiBold text-white bg-slate-900 flex-center h-12 py-2 px-4 rounded-lg">
                            Go To Admin Panel
                        </Link>
                    ) : (
                        <>
                            <UserProfile src={userInfo?.profile} username={userInfo?.username} />
                            <div className="flex flex-col gap-y-1">
                                <span className="text-base line-clamp-1">{userInfo?.username}</span>
                                <div className="flex items-center gap-x-2">
                                    <ActiveDot />
                                    <span className="opacity-75 text-sm font-Montserrat">Online</span>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                <span className="block w-full h-[0.5px] bg-slate-900 opacity-25"></span>
                <div className="font-MontserratMedium space-y-4">
                    <LinkByIcon to="/flights" className="flex items-center justify-between gap-x-4">
                        <TextByIcon text="Find Flight" className="flex items-center gap-x-2" iconID="airplane" iconClasses="w-4.5 h-4.5" />
                    </LinkByIcon>

                    <LinkByIcon to="/hotels" className="flex items-center justify-between gap-x-4">
                        <TextByIcon text="Find Stays" className="flex items-center gap-x-2" iconID="bed" iconClasses="w-4.5 h-4.5" />
                    </LinkByIcon>

                    <LinkByIcon to="/favourites" className="flex items-center justify-between gap-x-4" iconID="chevron-right" iconClasses="w-4 h-4">
                        <TextByIcon text="Favourites" className="flex items-center gap-x-2" iconID="heart" iconClasses="w-4.5 h-4.5" />
                    </LinkByIcon>
                </div>
                <div className={`space-y-6 ${!authContext.isLoggedIn && 'opacity-50 pointer-events-none'}`}>
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
                        <LinkByIcon to="/account" className="flex items-center justify-between gap-x-4" iconID="chevron-right" iconClasses="w-4 h-4">
                            <TextByIcon text="Support" className="flex items-center gap-x-2" iconID="support" iconClasses="w-4.5 h-4.5" />
                        </LinkByIcon>

                        <button
                            className="flex items-center justify-between w-full gap-x-4"
                            onClick={() => {
                                onClose();
                                showLogOutModal();
                            }}
                        >
                            <TextByIcon text="logout" className="flex items-center gap-x-2" iconID="logout" iconClasses="w-4.5 h-4.5" />
                        </button>
                    </div>
                </div>
            </div>
            <QuestionModal message="You sure to logout from your account?" isShow={isShowLogOutModal} onClose={onCloseModal} onAccept={logOutUser} />
        </>
    );
}
