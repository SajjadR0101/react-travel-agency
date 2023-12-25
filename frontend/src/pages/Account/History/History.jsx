import React, { useContext, useEffect, useState } from "react";
import Svg from "../../../components/Svg/Svg";
import HeaderItemsSelector from "../../../components/HeaderItemsSelector/HeaderItemsSelector";
import AccountticketAndBookBox from "../../../components/AccountticketAndBookBox/AccountticketAndBookBox";
import PageTransition from "../../../components/PageTransition/PageTransition";
import AuthContext from "../../../context/AuthContext";
import useDataFetch from "../../../hooks/useDataFetch";
import Loading from "../../../components/Loading/Loading";
import Alert from "../../../components/Alert/Alert";

export default function History() {
    const [isFlightShow, setIsFlightShow] = useState(true);

    const authContext = useContext(AuthContext);
    const userInfo = authContext.userInfo;

    const [flightOrders, refreshFlightOrders, penddingFlightOrders] = useDataFetch(`https://node-travel-agency.liara.run/api/users/${userInfo?.id}/flights`);
    const [hotelOrders, refreshHotelOrders, penddingHotelOrders] = useDataFetch(`https://node-travel-agency.liara.run/api/users/${userInfo?.id}/hotels`);

    useEffect(() => {
        refreshFlightOrders();
        refreshHotelOrders();
    }, [userInfo?.id]);

    return (
        <PageTransition>
            <div className="container">
                <div className="flex flex-wrap items-end gap-y-4 justify-between">
                    <span className="font-TradeGothic font-bold text-black text-xl md:text-3xl">Tickets/Bookings</span>
                    <span className="text-slate-900 flex-center gap-x-1 font-MontserratSemiBold text-xs md:text-base">
                        Upcoming
                        <Svg iconID="chevron-down" className="w-4 h-4" />
                    </span>
                </div>
                <HeaderItemsSelector
                    selectItems={[
                        { title: "Flights", iconID: "airplane", onClick: () => setIsFlightShow(true) },
                        { title: "Stays", iconID: "bed", onClick: () => setIsFlightShow(false) },
                    ]}
                    className="my-4"
                />
                <div>
                    {isFlightShow && (
                        <Loading isPendding={penddingFlightOrders} className="min-h-[150px]">
                            <div className={`mt-4 space-y-4 transition-all animate-loadByOpacity`}>{!flightOrders.length ? <Alert message="You does not have any flight." /> : flightOrders.map((flight) => flight && <AccountticketAndBookBox key={flight?.id} {...flight} />)}</div>
                        </Loading>
                    )}
                    {!isFlightShow && (
                        <Loading isPendding={penddingHotelOrders} className="min-h-[150px]">
                            <div className={`mt-4 space-y-4 transition-all`}>{!hotelOrders.length ? <Alert message="You does not have any hotel." /> : hotelOrders.map((hotel) => hotel && <AccountticketAndBookBox key={hotel?.id} {...hotel} isBooking />)}</div>
                        </Loading>
                    )}
                </div>
            </div>
        </PageTransition>
    );
}
