import React, { memo, useContext } from "react";
import CmsHaederBtn from "./CmsHaederBtn";
import CmsNavbarItem from "./CmsNavbarItem";
import LinkByIcon from "../../../components/LinkByIcon/LinkByIcon";
import useModal from "../../../hooks/useModal";
import QuestionModal from "../../../components/QuestionModal/QuestionModal";
import AuthContext from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default memo(function CmsHeader() {
    const authContext = useContext(AuthContext)
    const [isShowLogOutModal, showLogOutModal, onCloseModal] = useModal();

    const navigate = useNavigate()

    const logOutUser = () => {
        authContext.logOut()
        navigate('/')
    }

    return (
        <>
            <header className="flex justify-between">
                <div className="flex items-center gap-x-8 xl:gap-x-16">
                    <LinkByIcon text="Globle Travel" to="/" className="shrink-0 flex items-center gap-x-4 font-TradeGothic text-lg font-bold text-slate-900/60" iconID="squares" iconClasses="w-8 h-8" />
                    <nav>
                        <ul className="flex items-center gap-x-6 2xl:gap-x-8 text-sm font-MontserratMedium text-slate-600">
                            <CmsNavbarItem title="Dashboard" to="/admin-panel/" />
                            <CmsNavbarItem title="Users" to="users" />
                            <CmsNavbarItem title="Flights" to="flight-all" />
                            <CmsNavbarItem title="Hotels" to="hotel-all" />
                            <CmsNavbarItem title="Companies" to="companies" />
                            <CmsNavbarItem title="NewsLatter" to="newslatter" />
                            <CmsNavbarItem title="Admin Info" to="admin-info" />
                            <button className="load-btn h-10 2xl:hidden" onClick={showLogOutModal}>
                                Logout
                            </button>
                        </ul>
                    </nav>
                </div>
                <div>
                    <div className="hidden xl:flex items-center gap-x-2">
                        <CmsHaederBtn iconID="bell" badge badgeTitle="1" active />
                        <CmsHaederBtn iconID="comment" />
                        <CmsHaederBtn iconID="users-fill" />
                        <CmsHaederBtn iconID="chart-bar-square" />
                    </div>
                </div>
            </header>
            <QuestionModal message="You sure to logout from your account?" isShow={isShowLogOutModal} onClose={onCloseModal} onAccept={logOutUser} />
        </>
    );
});
