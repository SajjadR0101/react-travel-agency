import React, { memo, useContext, useEffect } from "react";
import AccountUserInfoBox from "../../../components/AccountUserInfoBox/AccountUserInfoBox";
import Button from "../../../components/Button/Button";
import Svg from "../../../components/Svg/Svg";
import AuthContext from "../../../context/AuthContext";
import useFetch from "../../../hooks/useFetch";
import PageTransition from "../../../components/PageTransition/PageTransition";
import EditUserModal from "../../Cms/components/EditUserModal";
import useModal from "../../../hooks/useModal";

export default memo(function Home() {
    const authContext = useContext(AuthContext);
    const userInfo = authContext?.userInfo;

    const [isShowEditModal, showEditModal, onCloseEditModal, editModalProps] = useModal();

    return (
        <PageTransition>
            <div className="container">
                <span className="text-black font-TradeGothic font-bold text-xl md:text-3xl">Account</span>
                <div className="mt-4 bg-white shadow-card py-8 px-6 rounded-2xl space-y-8">
                    <AccountUserInfoBox title={userInfo?.username} subTitle="UserName" changeOnClick={() => showEditModal({ userInfo })} />
                    <AccountUserInfoBox title={userInfo?.email} subTitle="Email" leftComponent={<Button title="Add another email" size="lg" outline beforeIcon={<Svg iconID="add" className="w-5 h-5" />} />} changeOnClick={() => showEditModal({ userInfo })} />
                    <AccountUserInfoBox title={userInfo?.password} subTitle="Password" changeOnClick={() => showEditModal({ userInfo })} />
                    <AccountUserInfoBox title={userInfo?.phone} subTitle="Phone number" changeOnClick={() => showEditModal({ userInfo })} />
                </div>
            </div>
            <EditUserModal isShow={isShowEditModal} onClose={onCloseEditModal} onConfirm={authContext.refreshUserInfo} {...editModalProps} />
        </PageTransition>
    );
});
