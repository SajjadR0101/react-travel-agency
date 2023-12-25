import React, { useContext } from "react";
import TextByIcon from "../../../components/TextByIcon/TextByIcon";
import UserProfile from "../../../components/UserProfile/UserProfile";
import AuthContext from "../../../context/AuthContext";
import ActiveDot from "./ActiveDot";

const UserInfoItems = ({ info = "", value = "" }) => {
    return (
        <div className="flex items-center justify-between gap-x-2">
            <span className="font-MontserratMedium text-sm">{info}</span>
            <span className="text-sm opacity-75 line-clamp-1">{value}</span>
        </div>
    );
};

export default function AdminInfoSidebar() {
    const authContext = useContext(AuthContext);
    const userInfo = authContext.userInfo;

    return (
        <div className="bg-white rounded-2xl shadow-box w-[350px] p-6">
            <TextByIcon text="Admin Information" className="flex items-center gap-x-2 border-b border-b-slate-200 pb-6 text-slate-600 font-MontserratMedium" iconID="stack" iconClasses="w-5 h-5" />
            <div className="pt-6 flex-center flex-col">
                <div className="flex items-center flex-col gap-y-4 text-slate-600">
                    <UserProfile src={userInfo?.profile} username={userInfo?.username} className="w-32 h-32" />
                    <span className="text-2xl font-MontserratMedium">{userInfo?.username}</span>
                    <div className="flex items-center gap-x-2">
                        <ActiveDot />
                        <span>Online</span>
                    </div>
                </div>
                <div className="w-full space-y-4 mt-8 text-slate-500">
                    <UserInfoItems info="Rule" value={"Admin"} />
                    <UserInfoItems info="Username" value={userInfo?.username} />
                    <UserInfoItems info="Email" value={userInfo?.email} />
                    <UserInfoItems info="Phone" value={userInfo?.phone} />
                    <UserInfoItems info="Password" value={"*".repeat(userInfo?.password.length || 5)} />
                </div>
            </div>
        </div>
    );
}
