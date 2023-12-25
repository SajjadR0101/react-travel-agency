import React from "react";
import PageTransition from "../../components/PageTransition/PageTransition";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import Section from "../../components/Section/Section";
import TextByIcon from "../../components/TextByIcon/TextByIcon";
import ProductBoxReview from "../../components/ProductBoxReview/ProductBoxReview";
import Button from "../../components/Button/Button";
import Svg from "../../components/Svg/Svg";
import ImageCover from "../../components/ImageCover/ImageCover";
import CheckBox from "../../components/Form/CheckBox";
import GridSystem from "../../components/GridSystem/GridSystem";
import PresentFlightBox from "../../components/PresentFlightBox/PresentFlightBox";
import FlightDetailsIcons from "../../components/Icons/FlightDetailsIcons";
import { useParams } from "react-router-dom";
import useDataFetch from "../../hooks/useDataFetch";
import Loading from "../../components/Loading/Loading";
import LikeButton from "../../components/LikeButton/LikeButton";
import PageLoader from "../../components/PageLoader/PageLoader";

export default function FlightDetails() {
    const params = useParams();

    const [flight, , penddingFlight] = useDataFetch(`https://node-travel-agency.liara.run/api/flights/${params.flightID}`);

    return (
        <PageLoader isPendding={penddingFlight}>
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
                        <Section className="mt-8">
                            <div className="flex flex-col justify-center md:items-end md:flex-row md:justify-between gap-y-4">
                                <div className="flex flex-col items-center md:items-start">
                                    <h2 className={`font-TradeGothic font-bold text-xl xs:text-2xl mb-4 line-clamp-2`}>{flight[0]?.flightName}</h2>
                                    <TextByIcon text="Gümüssuyu Mah. Inönü Cad. No:8, Istanbul 34437" className={`flex flex-col xs:flex-row items-center gap-1 text-center mb-3 text-slate-900/75 text-xs font-MontserratMedium`} iconID="location" iconClasses="w-5 h-5" />
                                    <ProductBoxReview score={flight[0]?.score} reviewsCount={104} />
                                </div>
                                <div className="flex flex-col gap-y-4 xs:items-center text-center">
                                    <span className="text-3xl text-error font-MontserratBold md:self-end">${flight[0]?.price}</span>
                                    <div className="flex gap-x-4">
                                        <LikeButton productID={+params?.flightID} />
                                        <Button beforeIcon={<Svg iconID="share" className="w-5 h-5" />} size="lg" outline />
                                        <Button title="Book Now" size="lg" to="book" className="min-w-[150px] font-MontserratSemiBold grow xs:grow-0" />
                                    </div>
                                </div>
                            </div>
                            <ImageCover src="/images/flight_details/flight-main.webp" wrapperClassName="mt-8 mb-10 w-full overflow-hidden h-[300px] md:h-[500px] rounded-xl md:rounded-2xl" imageClassName="object-right-bottom lg:object-center " />
                        </Section>
                        <Section>
                            <div className="flex flex-col md:flex-row justify-between gap-4 items-center mb-6">
                                <h3 className="font-TradeGothic font-bold text-center text-xl xs:text-2xl">Basic Economy Features</h3>
                                <div className="flex justify-center flex-wrap gap-6">
                                    <CheckBox title="Economy" id="Economy" />
                                    <CheckBox title="First Class" id="First-Class" />
                                    <CheckBox title="Busines Class" id="Busines-Class" />
                                </div>
                            </div>
                            <GridSystem parentClaasName="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-6">
                                <ImageCover src="/images/flight_details/details_1.webp" wrapperClassName="h-40 overflow-hidden rounded-md md:rounded-2xl" />
                                <ImageCover src="/images/flight_details/details_2.webp" wrapperClassName="h-40 overflow-hidden rounded-md md:rounded-2xl" />
                                <ImageCover src="/images/flight_details/details_3.webp" wrapperClassName="h-40 overflow-hidden rounded-md md:rounded-2xl" />
                                <ImageCover src="/images/flight_details/details_4.webp" wrapperClassName="h-40 overflow-hidden rounded-md md:rounded-2xl" />
                                <ImageCover src="/images/flight_details/details_5.webp" wrapperClassName="h-40 overflow-hidden rounded-md md:rounded-2xl" />
                                <ImageCover src="/images/flight_details/details_9.webp" wrapperClassName="h-40 overflow-hidden rounded-md md:rounded-2xl" />
                                <ImageCover src="/images/flight_details/details_7.webp" wrapperClassName="h-40 overflow-hidden rounded-md md:rounded-2xl" />
                                <ImageCover src="/images/flight_details/details_8.webp" wrapperClassName="h-40 overflow-hidden rounded-md md:rounded-2xl" />
                            </GridSystem>
                        </Section>
                        <Section className="my-10">
                            <div className="bg-primary/60 p-4 rounded-lg text-center md:text-start">
                                <h4 className="font-TradeGothic font-bold text-xl xs:text-2xl mb-4">Emirates Airlines Policies</h4>
                                <div className="flex flex-col lg:flex-row items-center md:items-start lg:items-center gap-4">
                                    <TextByIcon text="Pre-flight cleaning, installation of cabin HEPA filters." className="flex text-sm xs:text-base items-center gap-x-4 lg:w-1/2" iconID="squares-plus" iconClasses="w-6 h-6 hidden sm:inline-block" />
                                    <TextByIcon text="Pre-flight health screening questions." className="flex text-sm xs:text-base items-center gap-x-4 lg:w-1/2" iconID="squares-plus" iconClasses="w-6 h-6 hidden sm:inline-block" />
                                </div>
                            </div>
                        </Section>
                        <Section className="space-y-10">
                            <Loading isPendding={penddingFlight}>
                                <PresentFlightBox {...flight[0]} />
                            </Loading>
                        </Section>
                    </div>
                </main>
            </PageTransition>
        </PageLoader>
    );
}
