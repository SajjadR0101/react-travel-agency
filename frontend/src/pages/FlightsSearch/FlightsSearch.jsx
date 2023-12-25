import React from "react";
import GlobalIcons from "../../components/Icons/GlobalIcons";
import HeaderOfPage from "../../components/HeaderOfPage/HeaderOfPage";
import SearchBox from "../../components/SerachBox/SerachBox";
import Button from "../../components/Button/Button";
import Svg from "../../components/Svg/Svg";
import Input from "../../components/Form/Input";
import Select from "../../components/Form/Select";
import Section from "../../components/Section/Section";
import SectionHead from "../../components/SectionHead/SectionHead";
import GridSystem from "../../components/GridSystem/GridSystem";
import TravelPresentBox from "../../components/TravelPresentBox/TravelPresentBox";
import ImageCover from "../../components/ImageCover/ImageCover";
import RecentSearchBox from "../../components/RecentSearchBox/RecentSearchBox";
import FlightsSearchForm from "../../components/FlightsSearchForm/FlightsSearchForm";
import PageTransition from "../../components/PageTransition/PageTransition";
import { Link } from "react-router-dom";

export default function FlightsSearch() {
    return (
        <PageTransition>
            <HeaderOfPage className="h-[450px] md:h-[540px] pt-20 bg-flights_search bg-cover bg-top" title="Make your travel whishlist, we’ll do the rest" subTitle="Special offers to suit your plan" />
            <main className="-translate-y-32 mb-[200px]">
                <div className="container">
                    <div>
                        <SearchBox title="Where are you flying?" btn={<Button title="Show Filghts" to='all' size="lg" beforeIcon={<Svg iconID="paper-plane" className="w-5 h-5 -rotate-45" />} />}>
                            <FlightsSearchForm className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-6" />
                        </SearchBox>
                    </div>
                    <Section className="mt-20">
                        <SectionHead title="Your recent searches" />
                        <div className="items-center justify-items-center"></div>
                        <GridSystem parentClaasName="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                            <RecentSearchBox imageSrc="/images/searchs/search_1.webp" title="Istanbul, Turkey" subTitle="325 places" />
                            <RecentSearchBox imageSrc="/images/searchs/search_2.webp" title="Sydney, Australia" subTitle="325 places" />
                            <RecentSearchBox imageSrc="/images/searchs/search_3.webp" title="Baku, Azerbaijan" subTitle="325 places" />
                            <RecentSearchBox imageSrc="/images/searchs/search_4.webp" title="Malé, Maldives" subTitle="325 places" />
                        </GridSystem>
                    </Section>
                    <Section className="mt-20">
                        <SectionHead title="Fall into travel" subTitle="Going somewhere to celebrate this season? Whether you’re going home or somewhere to roam, we’ve got the travel tools to get you to your destination." btnTitle="See All" to="all" />
                        <GridSystem parentClaasName="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-10">
                            <TravelPresentBox imageSrc="/images/travels/travel_1.webp" title="Melbourne" subTitle="An amazing journey" price="700" />
                            <TravelPresentBox imageSrc="/images/travels/travel_2.webp" title="Paris" subTitle="London eye adventure" price="600" />
                            <TravelPresentBox imageSrc="/images/travels/travel_3.webp" title="London" subTitle="London eye adventure" price="350" />
                            <TravelPresentBox imageSrc="/images/travels/travel_4.webp" title="Columbia" subTitle="Amazing streets" price="700" />
                        </GridSystem>
                    </Section>
                    <Section className="mt-20">
                        <SectionHead title="Fall into travel" subTitle="Going somewhere to celebrate this season? Whether you’re going home or somewhere to roam, we’ve got the travel tools to get you to your destination." btnTitle="See All" to="all" />
                        <GridSystem parentClaasName="grid grid-cols-4 gap-4 mt-10">
                            <div className="col-span-4 order-1 lg:order-none lg:col-span-2 row-span-2 bg-primary p-6 rounded-2xl flex flex-col justify-between">
                                <div className="text-slate-900">
                                    <div className="flex flex-col xs:flex-row justify-between items-start gap-x-2 gap-y-4">
                                        <h4 className="font-TradeGothic font-bold text-center xs:text-start text-3xl/10 sm:text-5xl/[54px] xs:max-w-[360px]">Backpacking Sri Lanka</h4>
                                        <div className="p-2 rounded-lg bg-white child:block text-center w-full xs:w-auto">
                                            <span className="text-sm">From</span>
                                            <span className="font-MontserratSemiBold text-xl mt-1">$700</span>
                                        </div>
                                    </div>
                                    <p className="mt-6 text-sm">Traveling is a unique experience as it's the best way to unplug from the pushes and pulls of daily life. It helps us to forget about our problems, frustrations, and fears at home. During our journey, we experience life in different ways. We explore new places, cultures, cuisines, traditions, and ways of living.</p>
                                </div>
                                <Link to='all' className="py-2 px-4 h-12 flex-center bg-white text-slate-900 font-MontserratMedium text-sm rounded transition-all hover:bg-slate-50 mt-28 lg:mt-0">Book Flight</Link>
                            </div>
                            <ImageCover src="/images/travels/travel_5.webp" alt="" wrapperClassName="h-[220px] rounded-2xl border-2 border-primary overflow-hidden col-span-4 sm:col-span-2 lg:col-span-1" />
                            <ImageCover src="/images/travels/travel_6.webp" alt="" wrapperClassName="h-[220px] rounded-2xl border-2 border-primary overflow-hidden col-span-4 sm:col-span-2 lg:col-span-1" />
                            <ImageCover src="/images/travels/travel_7.webp" alt="" wrapperClassName="h-[220px] rounded-2xl border-2 border-primary overflow-hidden col-span-4 sm:col-span-2 lg:col-span-1" />
                            <ImageCover src="/images/travels/travel_8.webp" alt="" wrapperClassName="h-[220px] rounded-2xl border-2 border-primary overflow-hidden col-span-4 sm:col-span-2 lg:col-span-1" />
                        </GridSystem>
                    </Section>
                </div>
            </main>
        </PageTransition>
    );
}
