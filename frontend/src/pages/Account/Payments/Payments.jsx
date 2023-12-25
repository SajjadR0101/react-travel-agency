import React, { useCallback, useContext, useEffect, useState } from "react";
import PaymentCartBox from "../../../components/PaymentCartBox/PaymentCartBox";
import AddNewCardModal from "../../../components/AddNewCardModal/AddNewCardModal";
import PageTransition from "../../../components/PageTransition/PageTransition";
import Loading from "../../../components/Loading/Loading";
import QuestionModal from "../../../components/QuestionModal/QuestionModal";
import AuthContext from "../../../context/AuthContext";
import useFetch from "../../../hooks/useFetch";
import useModal from "../../../hooks/useModal";
import ToastContext from "../../../context/ToastContext";
import AddNewCartBox from "../../../components/AddNewCartBox/AddNewCartBox";
import useCart from "../../../hooks/useCart";

export default function Payments() {
    const [isShowModal, setIsShowModal] = useState(false);
    const [removeCardID, setRemoveCardID] = useState(null);

    const authContext = useContext(AuthContext);
    const userInfo = authContext.userInfo;

    const { showToast } = useContext(ToastContext);

    const [isShowRemoveCardModal, showRemoveCardModalModal, onCloseRemoveCardModal] = useModal();

    const [cards, refreshCarts, isPendding] = useCart(userInfo?.id, showToast);

    const [removeCardAction] = useFetch({
        url: "https://node-travel-agency.liara.run/api/cards/",
        method: "DELETE",
        successCallback: () => {
            showToast("success", "Your card removed.");
            refreshCarts();
        },
    });

    return (
        <PageTransition>
            <div className="container">
                <span className="text-black font-TradeGothic font-bold text-xl md:text-3xl">Payment methods</span>
                <Loading isPendding={isPendding} className="min-h-[240px]">
                    <div className="bg-white shadow-card rounded-3xl mt-4 p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {cards.map((card) => (
                            <PaymentCartBox
                                key={card.id}
                                {...card}
                                onRemove={() => {
                                    setRemoveCardID(card.id);
                                    showRemoveCardModalModal();
                                }}
                            />
                        ))}
                        <AddNewCartBox onClick={() => setIsShowModal(true)} />
                    </div>
                </Loading>
                <AddNewCardModal isShow={isShowModal} onClose={useCallback(() => setIsShowModal(false), [])} refreshCarts={refreshCarts} />
            </div>
            <QuestionModal message="You shre about removing this card ?" isShow={isShowRemoveCardModal} onClose={onCloseRemoveCardModal} onAccept={() => removeCardAction(null, [removeCardID])} />
        </PageTransition>
    );
}
