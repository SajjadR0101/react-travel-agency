import React, { useRef, useState } from "react";
import PageTransition from "../../components/PageTransition/PageTransition";
import HeaderItemsSelector from "../../components/HeaderItemsSelector/HeaderItemsSelector";
import useDataFetch from "../../hooks/useDataFetch";
import Loading from "../../components/Loading/Loading";
import Alert from "../../components/Alert/Alert";
import FlightProductBox from "../../components/FlightProductBox/FlightProductBox";
import HotelProductBox from "../../components/HotelProductBox/HotelProductBox";

export default function Favourites() {
    const [isShowFlights, setIsShowFlights] = useState(true);

    const favouritesFlights = JSON.parse(localStorage.getItem("favourites-flight"));
    const favouritesHotels = JSON.parse(localStorage.getItem("favourites-hotel"));

    const [flights, , penddingFlights] = useDataFetch("https://node-travel-agency.liara.run/api/flights");
    const [hotels, , penddingHotels] = useDataFetch("https://node-travel-agency.liara.run/api/hotels");

    const containerRef = useRef(null);

    return (
        <PageTransition>
            <main className="mb-[300px] mt-12">
                <div className="container" ref={containerRef}>
                    <h2 className={`font-TradeGothic font-bold text-2xl xs:text-3xl mb-6 text-center sm:text-start`}>Favourites</h2>
                    <HeaderItemsSelector
                        selectItems={[
                            { title: "Flights", subTitle: `${(favouritesFlights || []).length || "No"} marked`, onClick: () => setIsShowFlights(true) },
                            { title: "Places", subTitle: `${(favouritesHotels || []).length || "No"} marked`, onClick: () => setIsShowFlights(false) },
                        ]}
                        containerRef={containerRef}
                    />
                    <div className="mt-10">
                        {isShowFlights ? (
                            <Loading isPendding={penddingFlights}>
                                {!!favouritesFlights?.length ? (
                                    <div className="space-y-6">
                                        {flights
                                            .filter((flight) => favouritesFlights.includes(flight.id))
                                            .map((flight) => (
                                                <FlightProductBox key={flight.id} {...flight} />
                                            ))}
                                    </div>
                                ) : (
                                    <Alert message="No favourites flight to display." />
                                )}
                            </Loading>
                        ) : (
                            <Loading isPendding={penddingHotels}>
                                {!!favouritesHotels?.length ? (
                                    <div className="space-y-6">
                                        {hotels
                                            .filter((hotel) => favouritesHotels.includes(hotel.id))
                                            .map((hotel) => (
                                                <HotelProductBox key={hotel.id} {...hotel} />
                                            ))}
                                    </div>
                                ) : (
                                    <Alert message="No favourites hotel to display." />
                                )}
                            </Loading>
                        )}
                    </div>
                </div>
            </main>
        </PageTransition>
    );
}
