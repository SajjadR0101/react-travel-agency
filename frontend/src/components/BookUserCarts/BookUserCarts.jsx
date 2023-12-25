import React, { useCallback, useContext, useState } from "react";
import AddNewCartBox from "../AddNewCartBox/AddNewCartBox";
import Svg from "../Svg/Svg";
import CustomCheckBox from "../CustomCheckBox/CustomCheckBox";
import useModal from "../../hooks/useModal";
import useCart from "../../hooks/useCart";
import AddNewCardModal from "../AddNewCardModal/AddNewCardModal";
import Loading from "../Loading/Loading";
import AuthContext from "../../context/AuthContext";
export default function BookUserCarts({ showToast = () => {} }) {

    const authContext = useContext(AuthContext)
    const { id } = authContext.userInfo

    const [isShowModal, showModal, onCloseModal] = useModal();
    const [cards, refreshCarts, isPendding] = useCart(id, showToast);
    const [activeCart, setActiveCart] = useState(0)

    return (
        <>
            <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-box">
                <Loading isPendding={isPendding} parentClassName="space-y-4">
                    {cards.map((cart, index) => {
                        return (
                            <CustomCheckBox isActive={index === activeCart} onClick={() => setActiveCart(index)}>
                                <div className="flex items-center gap-x-6">
                                    <Svg iconID="visa" className="w-12 h-12" />
                                    <div className="flex items-center gap-x-4">
                                        <span className="font-MontserratSemiBold">**** {cart.number.slice(-4)}</span>
                                        <span className="text-sm hidden xs:block">{cart.expDate}</span>
                                    </div>
                                </div>
                            </CustomCheckBox>
                        );
                    })}
                    <AddNewCartBox onClick={() => showModal()} />
                </Loading>
            </div>
            <AddNewCardModal isShow={isShowModal} onClose={onCloseModal}  propShowToast={showToast} refreshCarts={refreshCarts} />
        </>
    );
}
