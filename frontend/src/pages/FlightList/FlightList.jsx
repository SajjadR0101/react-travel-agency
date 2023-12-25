import React, { useEffect, useRef, useState } from "react";
import FlightsSearchForm from "../../components/FlightsSearchForm/FlightsSearchForm";
import Button from "../../components/Button/Button";
import LoadingButton from "../../components/Button/LoadingButton";
import Svg from "../../components/Svg/Svg";
import HeaderItemsSelector from "../../components/HeaderItemsSelector/HeaderItemsSelector";
import FlightProductBox from "../../components/FlightProductBox/FlightProductBox";
import FilterProduct from "../../components/FilterProduct/FilterProduct";
import useDataFetch from "../../hooks/useDataFetch";
import Loading from "../../components/Loading/Loading";
import PageTransition from "../../components/PageTransition/PageTransition";
import FilterProductContext from "../../context/FilterProductContext";
import useFilterProduct from "../../hooks/useFilterProduct";
import Alert from "../../components/Alert/Alert";

const FlightListFiltering = () => {
    const [isShow, setIsShow] = useState(false);

    return (
        <div className="xl:col-span-3 relative z-10 xl:block">
            <Button
                title="Filtering"
                size="lg"
                outline
                className="xl:hidden"
                afterIcon={<Svg iconID="filter" className="w-5 h-5 text-slate-600" />}
                onClick={() => {
                    setIsShow((prevState) => !prevState);
                }}
            />
            <FilterProduct className={`absolute left-0 top-full mt-2 xl:mt-auto min-w-[280px] xs:min-w-[350px] xl:min-w-0 bg-white xl:bg-transparent p-4 xl:p-0 rounded-md xl:rounded-none shadow-box xl:shadow-none transition-all ${isShow ? "opacity-100 visible" : "opacity-0 invisible"} xl:opacity-100 xl:visible xl:static`} />
        </div>
    );
};

export default function FlightList() {
    const [flights, refreshFlights, penddingFlights] = useDataFetch("https://node-travel-agency.liara.run/api/flights");

    const sortMode = useRef('default')

    const [sortedFlights, setSortedFlights] = useState([]);

    const [filteredFlights, filterFlight] = useFilterProduct(flights);

    const sortFlights = (mode) => {
        switch (mode) {
            case "cheapest": {
                setSortedFlights([...filteredFlights].sort((currentFlight, nextFlight) => currentFlight.price - nextFlight.price));
                sortMode.current = 'cheapest'
                break;
            }

            case "best": {
                setSortedFlights([...filteredFlights].sort((currentFlight, nextFlight) => nextFlight.score - currentFlight.score));
                sortMode.current = 'best'
                break;
            }

            case "quick": {
                setSortedFlights([...filteredFlights].sort((currentFlight, nextFlight) => currentFlight.flyTime - nextFlight.flyTime));
                sortMode.current = 'quick'
                break;
            }

            default: {
                setSortedFlights([...filteredFlights]);
                sortMode.current = 'default'
            }
        }
    };

    useEffect(() => {
        sortFlights(sortMode.current)
    }, [filteredFlights])

    return (
        <PageTransition>
            <FilterProductContext.Provider
                value={{
                    filterReducer: filterFlight,
                }}
            >
                <main className="mb-[300px] mt-12">
                    <div className="container">
                        <div className="bg-white shadow-card py-8 px-6 rounded-2xl flex flex-col gap-x-4 gap-y-4 items-end">
                            <FlightsSearchForm className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-7 gap-6 flex-grow w-full" />
                            <Button title="Search" size="lg" outline afterIcon={<Svg iconID="search" className="w-5 h-5 text-slate-600" />} />
                        </div>
                        <div className="grid grid-cols-12 gap-4 mt-6">
                            <FlightListFiltering />
                            <div className="col-span-12 xl:col-span-9">
                                <div className="xl:pl-4 xl:border-l-[0.5px]">
                                    <div className="hidden md:block">
                                        <HeaderItemsSelector
                                            selectItems={[
                                                { title: "Not Sorted", iconID: "bars", onClick: () => sortFlights("") },
                                                { title: "Cheapest", subTitle: "$120", onClick: () => sortFlights("cheapest") },
                                                { title: "Best", subTitle: "5 star", onClick: () => sortFlights("best") },
                                                { title: "Quickest", subTitle: "2h 18m", onClick: () => sortFlights("quick") },
                                            ]}
                                            defaultActiveElem={0}
                                        />
                                    </div>
                                    <div className="text-slate-900 my-6 flex justify-between items-center font-MontserratSemiBold text-sm">
                                        <span className="block w-full sm:w-auto text-center">
                                            Showing 4 of <span className="text-error">257 places</span>
                                        </span>
                                        <div className="hidden sm:flex items-center gap-x-1">
                                            <span className="font-Montserrat">Sort by</span> <span>Recommended</span>
                                            <Svg iconID="chevron-down" className="w-4.5 h-4.5" />
                                        </div>
                                    </div>
                                    <Loading isPendding={penddingFlights}>
                                        <div>
                                            <div className="space-y-8">{!filteredFlights.length ? <Alert message="No flight to display." /> : sortedFlights.map((flight) => <FlightProductBox key={flight.id} {...flight} />)}</div>
                                        </div>
                                        <LoadingButton className="w-full mt-8">Show more results</LoadingButton>
                                    </Loading>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </FilterProductContext.Provider>
        </PageTransition>
    );
}
