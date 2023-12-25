import React, { useState, useContext, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import Svg from "../Svg/Svg";
import LinkByIcon from "../LinkByIcon/LinkByIcon";
import NavbarUserAccount from "../NavbarUserAccount/NavbarUserAccount";
import NavbarMobile from "../NavbarMobile/NavbarMobile";
import Overlay from "../Overlay/Overlay";
import AuthContext from "../../context/AuthContext";
import UserProfile from "../UserProfile/UserProfile";
import TextByIcon from "../TextByIcon/TextByIcon";
import Button from "../Button/Button";

export default function Navbar() {
    const [isOpenSidebar, setIsOpenSidebar] = useState(false);

    const authContext = useContext(AuthContext);
    const userInfo = authContext.userInfo;

    const navigate = useNavigate();

    const closeSidebar = useCallback(() => {
        setIsOpenSidebar(false);
    }, []);

    return (
        <nav className="py-5 z-10">
            <div className="container flex items-center justify-between text-sm font-MontserratSemiBold relative">
                <div className="relative items-center text-white gap-x-8 hidden sm:flex">
                    <LinkByIcon text="Find Flight" to="/flights" className="flex items-center gap-x-1 h-12" iconID="airplane" iconClasses="w-6 h-6" />
                    <LinkByIcon text="Find Stays" to="/hotels" className="flex items-center gap-x-1 h-12" iconID="bed" iconClasses="w-6 h-6" />
                </div>
                <div className="mr-auto sm:hidden">
                    <Button title="Login" to="/login" className={`h-auto bg-white hover:bg-white ${!authContext.isLoggedIn && !authContext.isPendding ? "flex" : "!hidden"}`} />
                    <Button title="Account" to="/account" className={`h-auto bg-white hover:bg-white ${authContext.isLoggedIn && authContext.userInfo?.role === "user" ? "flex" : "!hidden"}`} />
                    <Button title="Admin P" to="/admin-panel/" className={`h-auto bg-white hover:bg-white ${authContext.isLoggedIn && authContext.userInfo?.role === "admin" ? "flex" : "!hidden"}`} />
                </div>
                <Link to="/">
                    <Svg iconID="app-logo-landing" className="w-[110px] h-8 inline-block absolute inset-0 m-auto sm:hidden md:inline-block" />
                </Link>
                <div className="sm:hidden ml-auto" onClick={() => setIsOpenSidebar(true)}>
                    <Svg iconID="bars" className="w-8 h-8 text-white" />
                </div>
                <div className="sm:hidden">
                    <Overlay isShow={isOpenSidebar} onClose={closeSidebar} />
                    <NavbarMobile isOpen={isOpenSidebar} onClose={closeSidebar} />
                </div>
                <div className={`items-center gap-x-8 hidden ${!authContext.isLoggedIn && !authContext.isPendding && "sm:flex"}`}>
                    <Link to="/login" className="text-white">
                        Login
                    </Link>
                    <Link to="/signup" className="text-slate-900 bg-white flex-center h-12 py-2.5 px-6 rounded-lg">
                        Sign Up
                    </Link>
                </div>
                <div className={`items-center gap-x-8 hidden ${authContext.isLoggedIn && "sm:flex"}`}>
                    {authContext.userInfo?.role === "admin" ? (
                        <Link to="/admin-panel/" className="font-MontserratSemiBold text-slate-900 bg-white flex-center h-12 py-2 px-4 rounded-lg">
                            Go To Admin Panel
                        </Link>
                    ) : (
                        <>
                            <LinkByIcon text="Favourites" to="/favourites" className="flex items-center gap-x-1 relative text-white after:absolute after:inset-y-0 after:-right-4 after:m-auto after:w-0.5 after:h-4 after:bg-white after:pointer-events-none" iconID="heart" iconClasses="w-6 h-6" />
                            <div className="flex items-center gap-x-2 relative cursor-pointer group">
                                <div className="relative">
                                    <UserProfile src={userInfo?.profile} username={userInfo?.username} className="!w-12 !h-12 !text-2xl !border-0" />
                                    <span className="flex-center absolute right-0 bottom-0 w-4 h-4 rounded-full bg-[#FF8682] cursor-pointer">
                                        <Svg iconID="chevron-down" className="w-2.5 h-2.w-2.5 stroke-2" />
                                    </span>
                                </div>
                                <span className="line-clamp-1 text-white">{userInfo?.username}</span>
                                <NavbarUserAccount userInfo={userInfo} onLogOut={authContext.logOut} />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
