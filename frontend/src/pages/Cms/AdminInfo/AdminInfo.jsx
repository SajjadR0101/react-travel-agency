import React from "react";
import PageTransition from "../../../components/PageTransition/PageTransition";
import AdminInfoSidebar from "../components/AdminInfoSidebar";
import EditAdminInfo from "../components/EditAdminInfo";

export default function AdminInfo() {
    return (
        <PageTransition>
            <div className="flex justify-between gap-x-8">
                <div className="grow">
                    <h2 className="font-TradeGothic font-bold text-3xl text-slate-600">Admin Infos</h2>
                    <EditAdminInfo />
                </div>
                <AdminInfoSidebar />
            </div>
        </PageTransition>
    );
}
