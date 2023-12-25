import React from "react";
import PageTransition from "../../components/PageTransition/PageTransition";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import Section from "../../components/Section/Section";
import ProductStar from "../../components/ProductStar/ProductStar";
import Button from "../../components/Button/Button";
import Svg from "../../components/Svg/Svg";
import TextByIcon from "../../components/TextByIcon/TextByIcon";
import ProductBoxReview from "../../components/ProductBoxReview/ProductBoxReview";
import GridSystem from "../../components/GridSystem/GridSystem";
import ImageCover from "../../components/ImageCover/ImageCover";
import HotelOverViewBox from "../../components/HotelOverViewBox/HotelOverViewBox";
import HotelRoomsBox from "../../components/HotelRoomsBox/HotelRoomsBox";
import Map from "../../components/Map/Map";
import { useParams } from "react-router-dom";
import useDataFetch from "../../hooks/useDataFetch";
import LikeButton from "../../components/LikeButton/LikeButton";
import PageLoader from "../../components/PageLoader/PageLoader";

export default function HotelDetails() {
    const params = useParams();

    const [hotel, , penddingHotel] = useDataFetch(`https://node-travel-agency.liara.run/api/hotels/${params?.hotelID}`);

    return (
        <PageLoader isPendding={penddingHotel}>
            <PageTransition>
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
                        <Section className="mt-8">
                            <div className="flex flex-col justify-center md:items-end md:flex-row md:justify-between gap-y-8">
                                <div className="flex flex-col items-center md:items-start">
                                    <div className="flex flex-col lg:flex-row items-center md:items-start lg:items-center gap-4 mb-4 text-center md:text-start">
                                        <h2 className="font-TradeGothic font-bold text-xl xs:text-2xl">{hotel[0]?.hotelName}</h2>
                                        <ProductStar starCount={Math.ceil(hotel[0]?.score || null)} product="Hotel" />
                                    </div>
                                    <TextByIcon text="Gümüssuyu Mah. Inönü Cad. No:8, Istanbul 34437" className="flex flex-col xs:flex-row items-center text-center gap-1 text-slate-900/75 text-xs font-MontserratMedium mb-2" iconID="location" iconClasses="w-5 h-5" />
                                    <ProductBoxReview score={hotel[0]?.score} reviewsCount={321} />
                                </div>
                                <div className="flex flex-col gap-y-4 xs:items-center md:items-end text-center">
                                    <span className="text-sm text-error font-MontserratBold">
                                        <span className="text-3xl">${hotel[0]?.price}</span>/night
                                    </span>
                                    <div className="flex gap-x-4">
                                        <LikeButton productID={+params?.hotelID} isHotel />
                                        <Button beforeIcon={<Svg iconID="share" className="w-5 h-5" />} size="lg" outline />
                                        <Button title="Book Now" size="lg" to="book" className="min-w-[150px] font-MontserratSemiBold grow xs:grow-0" />
                                    </div>
                                </div>
                            </div>
                        </Section>
                        <Section className="mt-8 relative">
                            <GridSystem parentClaasName="grid grid-cols-4 gap-1 sm:gap-2 overflow-hidden rounded-xl h-[500px]">
                                <ImageCover src="/images/hotel_details/details_1.webp" wrapperClassName="col-span-4 lg:col-span-2 row-span-2 rounded-sm overflow-hidden" />
                                <ImageCover src={hotel[0]?.cover} wrapperClassName="col-span-2 lg:col-span-1 row-span-2 lg:row-span-1 rounded-sm overflow-hidden" />
                                <ImageCover src="/images/hotel_details/details_3.webp" wrapperClassName="col-span-2 lg:col-span-1 row-span-2 lg:row-span-1 rounded-sm overflow-hidden" />
                                <ImageCover src="/images/hotel_details/details_4.webp" wrapperClassName="col-span-2 lg:col-span-1 row-span-2 lg:row-span-1 rounded-sm overflow-hidden" />
                                <ImageCover src="/images/hotel_details/details_5.webp" wrapperClassName="col-span-2 lg:col-span-1 row-span-2 lg:row-span-1 rounded-sm overflow-hidden" />
                            </GridSystem>
                            <Button title="View all photos" size="lg" className="!hidden lg:!flex absolute right-4 bottom-4 font-MontserratSemiBold" />
                        </Section>
                        <Section className="py-16 mt-10 border-y border-green-black/25 text-center md:text-start">
                            <h3 className="font-TradeGothic font-bold text-xl mb-4">Overview</h3>
                            <p className="font-MontserratMedium text-slate-900/75">
                                Located in Taksim Gmsuyu, the heart of Istanbul, the CVK Park Bosphorus Hotel Istanbul has risen from the ashes of the historic Park Hotel, which also served as Foreign Affairs Palace 120 years ago and is hosting its guests by assuming this hospitality mission. With its 452 luxurious rooms and suites, 8500 m2 SPA and fitness area, 18 meeting rooms including 4 dividable ones and 3 terraces with Bosphorus view, Istanbuls largest terrace with Bosphorus view (4500 m2) and latest technology infrastructure, CVK Park Bosphorus Hotel Istanbul is destined to be the
                                popular attraction point of the city. Room and suite categories at various sizes with city and Bosphorus view, as well as 68 separate luxury suites, are offered to its special guests as a wide variety of selection.
                            </p>
                            <div className="mt-8 flex flex-wrap gap-4">
                                <div className="bg-primary rounded-xl p-4 h-32 w-full sm:w-40 flex flex-col justify-between">
                                    <span className="font-TradeGothic font-bold text-2xl">{hotel[0]?.score}</span>
                                    <div className="text-sm flex flex-col gap-y-1">
                                        <span className="font-MontserratSemiBold">{{ 1: "Very Bad", 2: "Bad", 3: "middle", 4: "Good", 5: "Very Good" }[Math.ceil(hotel[0]?.score || null)]}</span>
                                        <span className="font-MontserratMedium">371 reviews</span>
                                    </div>
                                </div>
                                <HotelOverViewBox iconID="sparkles" text="Near park" className="hidden sm:flex" />
                                <HotelOverViewBox iconID="sparkles" text="Near nightlife" className="hidden sm:flex" />
                                <HotelOverViewBox iconID="sparkles" text="Near theater" className="hidden sm:flex" />
                                <HotelOverViewBox iconID="sparkles" text="Clean Hotel" className="hidden sm:flex" />
                            </div>
                        </Section>
                        <Section className="py-16 border-b border-green-black/25 text-center">
                            <h3 className="font-TradeGothic font-bold text-xl mb-8">Available Rooms</h3>
                            <div className="flex flex-col gap-y-4">
                                <HotelRoomsBox title="Superior room - 1 double bed or 2 twin beds" price="240" cover="/images/hotel_details/details_2.webp" />
                                <span className="w-full h-px bg-slate-900/10"></span>
                                <HotelRoomsBox title="Superior room - City view  - 1 double bed or 2 twin beds" price="280" cover="/images/hotel_details/details_3.webp" />
                                <span className="w-full h-px bg-slate-900/10"></span>
                                <HotelRoomsBox title="Superior room - City view  - 1 double bed or 2 twin beds" price="320" cover="/images/hotel_details/details_4.webp" />
                                <span className="w-full h-px bg-slate-900/10"></span>
                                <HotelRoomsBox title="Superior room - City view  - 1 double bed or 2 twin beds" price="350" cover="/images/hotel_details/details_5.webp" />
                            </div>
                        </Section>
                        <Section className="py-16">
                            <div className="flex flex-col sm:flex-row justify-between gap-4 items-center mb-8">
                                <h3 className="font-TradeGothic font-bold text-xl">Location/Map</h3>
                                <Button title="View on google maps" outline size="lg" className="font-MontserratSemiBold" />
                            </div>
                            <div className="h-[500px] overflow-hidden rounded-2xl">
                                <Map />
                            </div>
                        </Section>
                    </div>
                </main>
            </PageTransition>
        </PageLoader>
    );
}
