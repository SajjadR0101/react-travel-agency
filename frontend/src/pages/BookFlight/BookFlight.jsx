import React, { useContext } from "react";
import PageTransition from "../../components/PageTransition/PageTransition";
import FlightDetailsIcons from "../../components/Icons/FlightDetailsIcons";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { useParams } from "react-router-dom";
import useDataFetch from "../../hooks/useDataFetch";
import Section from "../../components/Section/Section";
import PresentFlightBox from "../../components/PresentFlightBox/PresentFlightBox";
import BookingDetaileBox from "../../components/BookingDetaileBox/BookingDetaileBox";
import CustomCheckBox from "../../components/CustomCheckBox/CustomCheckBox";
import PayFlightBookCheck from "../../components/PayFlightBookCheck/PayFlightBookCheck";
import BookSignupLogin from "../../components/BookSignupLogin/BookSignupLogin";
import BookUserCarts from "../../components/BookUserCarts/BookUserCarts";
import AuthContext from "../../context/AuthContext";
import useCart from "../../hooks/useCart";
import useToast from "../../hooks/useToast";
import Toast from "../../components/Toast/Toast";
import QuestionModal from "../../components/QuestionModal/QuestionModal";
import useModal from "../../hooks/useModal";
import useFetch from "../../hooks/useFetch";
import PageLoader from "../../components/PageLoader/PageLoader";

export default function BookFlight() {
    const authContext = useContext(AuthContext);

    const params = useParams();

    const [flight, , penddingFlight] = useDataFetch(`https://node-travel-agency.liara.run/api/flights/${params.flightID}`);

    const [isShowModal, showModal, onCloseModal] = useModal();

    const [isShowToast, showToast, toastOptions] = useToast();

    const [addFlightToUserAccountAction, isFetching] = useFetch({
        url: "https://node-travel-agency.liara.run/api/flights/order",
        method: "POST",
        contentType: true,
        authorizationID: true,
        successCallback: () => {
            showToast("success", "This flight was reserved for you.");
        },
        errorCallback: () => showToast("error", "Something wrong, please try latter."),
    });

    return (
        <PageLoader isPendding={authContext.isPendding || penddingFlight}>
            <PageTransition>
                <FlightDetailsIcons />
                <main className="mb-[300px] mt-12">
                    <div className="container">
                        <div className="flex justify-center md:justify-start">
                            <Breadcrumb
                                items={[
                                    { title: "Flights", to: "/flights" },
                                    { title: "Flight list", to: "/flights/all" },
                                    { title: flight[0]?.flightName, to: "" },
                                ]}
                            />
                        </div>
                        <Section className="mt-8 flex flex-col-reverse xl:flex-row gap-10">
                            <div className="grow flex flex-col gap-y-10">
                                <PresentFlightBox {...flight[0]} />
                                <PayFlightBookCheck />
                                {authContext.isLoggedIn ? <BookUserCarts showToast={showToast} /> : <BookSignupLogin />}
                            </div>
                            <div className="xl:w-2/5 2xl:w-1/3">
                                <BookingDetaileBox {...flight[0]} onClick={() => showModal()} isLoading={isFetching} />
                            </div>
                        </Section>
                    </div>
                </main>
                <QuestionModal message={`You sure about buy ${flight[0]?.flightName} flight from ${flight[0]?.fromCity} to ${flight[0]?.toCity}?`} isShow={isShowModal} onClose={onCloseModal} onAccept={() => addFlightToUserAccountAction({ flightID: flight[0]?.id })} />
                <Toast {...toastOptions} isShow={isShowToast} />
            </PageTransition>
        </PageLoader>
    );
}
