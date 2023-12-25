import React, { useContext } from "react";
import TextByIcon from "../../../components/TextByIcon/TextByIcon";
import CmsSidebarItem from "./CmsSidebarItem";
import AuthContext from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import QuestionModal from "../../../components/QuestionModal/QuestionModal";
import ImageCover from "../../../components/ImageCover/ImageCover";
import useModal from "../../../hooks/useModal";
import ActiveDot from '../components/ActiveDot'
import UserProfile from '../../../components/UserProfile/UserProfile'

export default function CmsSidebar() {
    const authContect = useContext(AuthContext);
    const userInfo = authContect.userInfo

    const navigate = useNavigate();

    const [isShowLogoutModal, showLogoutModal, onCLose] = useModal();

    const onLogout = () => {
        authContect.logOut();
        navigate("/");
    };

    return (
        <aside className="border border-slate-200 rounded-2xl p-4 space-y-2 col-span-2 h-[800px] sticky top-2 hidden 2xl:block">
            <div className="mb-4 pb-4 border-b border-slate-200 flex items-center gap-x-4">
                <UserProfile src={userInfo?.profile} username={userInfo?.username} className="shrink-0" />
                <div className="text-sm font-MontserratMedium text-slate-600 flex flex-col gap-y-2">
                    <span className="line-clamp-1">{userInfo?.username}</span>
                    <div className="flex items-center gap-x-2 text-xs">
                        <ActiveDot />
                        <span>Online</span>
                    </div>
                </div>
            </div>
            <CmsSidebarItem title="Dashboard" to="/admin-panel/" iconID="chart-pie" />
            <CmsSidebarItem title="Users" to="users" iconID="users-fill" />
            <CmsSidebarItem title="Flights" to="flight-all" iconID="squares" />
            <CmsSidebarItem title="Hotels" to="hotel-all" iconID="chart-bar" />
            <CmsSidebarItem title="Companies" to="companies" iconID="credit-card" />
            <CmsSidebarItem title="NewsLatter" to="newslatter" iconID="newslatter" />
            <CmsSidebarItem title="Admin Info" to="admin-info" iconID="stack" />
            <button className="admin-panel__sidebar-link w-full" onClick={showLogoutModal}>
                <TextByIcon text="Logout" className="flex items-center gap-x-2 font-MontserratSemiBold" iconID="logout-admin" iconClasses="w-7 h-7" />
            </button>
            <QuestionModal message="You sure about logout from this account ?" isShow={isShowLogoutModal} onClose={onCLose} onAccept={onLogout} />
        </aside>
    );
}
