import React, { useContext } from "react";
import PageTransition from "../../components/PageTransition/PageTransition";
import FlightDetailsIcons from "../../components/Icons/FlightDetailsIcons";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { useParams } from "react-router-dom";
import useDataFetch from "../../hooks/useDataFetch";
import Section from "../../components/Section/Section";
import BookingDetaileBox from "../../components/BookingDetaileBox/BookingDetaileBox";
import PayFlightBookCheck from "../../components/PayFlightBookCheck/PayFlightBookCheck";
import BookSignupLogin from "../../components/BookSignupLogin/BookSignupLogin";
import BookUserCarts from "../../components/BookUserCarts/BookUserCarts";
import AuthContext from "../../context/AuthContext";
import PresentHotelBox from "../../components/PresentHotelBox/PresentHotelBox";
import useToast from "../../hooks/useToast";
import Toast from "../../components/Toast/Toast";
import useModal from "../../hooks/useModal";
import useFetch from "../../hooks/useFetch";
import QuestionModal from "../../components/QuestionModal/QuestionModal";
import PageLoader from "../../components/PageLoader/PageLoader";

export default function BookHotel() {
    const authContext = useContext(AuthContext);

    const params = useParams();

    const [hotel, , penddingHotel] = useDataFetch(`https://node-travel-agency.liara.run/api/hotels/${params?.hotelID}`);

    const [isShowModal, showModal, onCloseModal] = useModal();

    const [isShowToast, showToast, toastOptions] = useToast();

    const [addHotelToUserAccountAction, isFetching] = useFetch({
        url: "https://node-travel-agency.liara.run/api/hotels/order",
        method: "POST",
        contentType: true,
        authorizationID: true,
        successCallback: () => {
            showToast("success", "This Hotel was reserved for you.");
        },
        errorCallback: () => showToast("error", "Something wrong, please try latter."),
    });

    return (
        <PageLoader isPendding={authContext.isPendding || penddingHotel}>
            <PageTransition>
                <FlightDetailsIcons />
                <main className="mb-[300px] mt-12">
                    <div className="container">
                        <div className="flex justify-center md:justify-start">
                            <Breadcrumb
                                items={[
                                    { title: "Hotels", to: "/hotels" },
                                    { title: "Hotels list", to: "/hotels/all" },
                                    { title: hotel[0]?.hotelName, to: "" },
                                ]}
                            />
                        </div>
                        <Section className="mt-8 flex flex-col-reverse xl:flex-row gap-10">
                            <div className="grow flex flex-col gap-y-10">
                                <PresentHotelBox {...hotel[0]} />
                                <PayFlightBookCheck />
                                {authContext.isLoggedIn ? <BookUserCarts /> : <BookSignupLogin />}
                            </div>
                            <div className="xl:w-2/5 2xl:w-1/3">
                                <BookingDetaileBox {...hotel[0]} onClick={() => showModal()} isLoading={isFetching} />
                            </div>
                        </Section>
                    </div>
                </main>
                <QuestionModal message={`You sure about buy ${hotel[0]?.hotelName} hotel?`} isShow={isShowModal} onClose={onCloseModal} onAccept={() => addHotelToUserAccountAction({ hotelID: hotel[0]?.id })} />
                <Toast {...toastOptions} isShow={isShowToast} />
            </PageTransition>
        </PageLoader>
    );
}
