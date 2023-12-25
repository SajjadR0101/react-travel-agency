import React, { memo, useCallback, useContext, useMemo } from "react";
import { createPortal } from "react-dom";
import Svg from "../Svg/Svg";
import Input from "../Form/Input";
import DateInput from "../Form/DateInput";
import CartInput from "../Form/CartInput";
import Select from "../Form/Select";
import Button from "../Button/Button";
import Overlay from "../Overlay/Overlay";
import useForm from "../../hooks/useForm";
import useFetch from "../../hooks/useFetch";
import { cardValidator, dateValidator, minValidator, maxValidator, requiredValidator, numberValidator } from "../../validator/rules";
import ToastContext from "../../context/ToastContext";

export default memo(function AddNewCardModal({ isShow, onClose, propShowToast = null, refreshCarts }) {
    const [formState, onInput, clearAllInputs] = useForm(["payment-card", "payment-exp-date", "payment-cvc", "payment-name", "payment-region"]);

    const { showToast } = propShowToast ? { showToast: propShowToast } : useContext(ToastContext);

    const onCloseModal = () => {
        onClose();
        clearAllInputs();
    };

    const [addNewCardAction, isFetching] = useFetch({
        url: "https://node-travel-agency.liara.run/api/cards/",
        method: "POST",
        contentType: true,
        authorizationID: true,
        successCallback: () => {
            showToast("success", "Your card successfuly added to your account.");
            onCloseModal();
            refreshCarts()
        },
        errorCallback: () => {
            showToast("error", "Something wrong, your card not added.");
        },
    });

    const submitHandler = useCallback((event) => {
        event.preventDefault();

        if (formState.isFormValid) {
            const { "payment-card": number, "payment-exp-date": expDate, "payment-cvc": cvc, "payment-name": nameOnCard, "payment-region": region } = formState.form;
            addNewCardAction({ number: number.value, expDate: expDate.value, cvc: cvc.value, nameOnCard: nameOnCard.value, region: region.value })
        } else {
            showToast("warning", "Please enter valid data");
        }
    }, [formState.isFormValid]);

    return createPortal(
        <>
            <div className={`bg-white p-8 lg:p-16 rounded-none sm:rounded-2xl max-w-full sm:max-w-[480px] lg:max-w-[640px] h-full sm:h-max z-20 fixed inset-0 m-auto transition-all ${isShow ? "visible opacity-100" : "invisible opacity-0"}`}>
                <button className="block ml-auto" onClick={onCloseModal}>
                    <Svg iconID="x-mark" className="w-5 h-5 text-black" />
                </button>
                <div>
                    <span className="font-TradeGothic font-bold text-2xl sm:text-4xl">Add a new Card</span>
                    <form className="mt-12">
                        <div className="grid grid-cols-2 gap-6">
                            <CartInput id="payment-card" label="Card Number" wrapperClassName="col-span-2" validations={useMemo(() => [requiredValidator(), cardValidator()], [])} onInput={onInput} />
                            <DateInput id="payment-exp-date" label="Exp. Date" orientation='landscape' wrapperClassName="col-span-2 sm:col-span-1" validations={useMemo(() => [requiredValidator(), dateValidator()], [])} onInput={onInput} />
                            <Input id="payment-cvc" label="CVC" wrapperClassName="col-span-2 sm:col-span-1" errorMessage="Enter a valid cvc" validations={useMemo(() => [requiredValidator(), numberValidator(), minValidator(3), maxValidator(5)], [])} onInput={onInput} />
                            <Input id="payment-name" label="Name on Card" wrapperClassName="col-span-2" errorMessage="The minimum of name is 5 character" validations={useMemo(() => [requiredValidator(), minValidator(5), maxValidator(20)], [])} onInput={onInput} />
                            <Select
                                id="payment-region"
                                label="Country or Region"
                                wrapperClassName="col-span-2"
                                options={useMemo(
                                    () => [
                                        { title: "United State", value: "United State" },
                                        { title: "Germany", value: "Germany" },
                                        { title: "France", value: "France" },
                                        { title: "Spain", value: "Spain" },
                                        { title: "Canada", value: "Canada" },
                                    ],
                                    []
                                )}
                                onSelect={onInput}
                            />
                            <div className="flex justify-between items-center text-sm font-MontserratMedium col-span-2">
                                <div className="flex items-center gap-x-2">
                                    <input type="checkbox" id="payment-remember-me" className="accent-black" />
                                    <label htmlFor="payment-remember-me" className="text-xs sm:text-base">
                                        Securely save my information for 1-click checkout
                                    </label>
                                </div>
                            </div>
                        </div>
                        <Button title="Submit Card" type="submit" isLoading={isFetching} disabled={isFetching} size="lg" className="mt-10 w-full font-MontserratSemiBold" onClick={submitHandler} />
                    </form>
                    <p className="text-xs opacity-75 text-center mt-4">By confirming your subscription, you allow The Outdoor Inn Crowd Limited to charge your card for this payment and future payments in accordance with their terms. You can always cancel your subscription.</p>
                </div>
            </div>
            <Overlay isShow={isShow} onClose={onCloseModal} />
        </>,
        document.body
    );
});
