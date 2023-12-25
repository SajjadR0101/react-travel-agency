import React from "react";
import LandingNavbar from "../../components/Navbar/LandingNavbar";
import LandingIcons from "../../components/Icons/LandingIcons";
import SearchForFlightAndHotelBox from "../../components/SearchForFlightAndHotelBox/SearchForFlightAndHotelBox";
import SectionHead from "../../components/SectionHead/SectionHead";
import LandingTripPlanBox from "../../components/LandingTripPlanBox/LandingTripPlanBox";
import Section from "../../components/Section/Section";
import GridSystem from "../../components/GridSystem/GridSystem";
import LandingPrefectBox from "../../components/LandingPrefectBox/LandingPrefectBox";
import LandingReviewBox from "../../components/LandingReviewBox/LandingReviewBox";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

import { motion } from "framer-motion";
import Footer from "../../components/Footer/Footer";

export default function Index() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .5 }}>
            <LandingIcons />
            <header className="min-h-[450px] md:min-h-[650px] m-0 sm:m-4 md:m-8 pt-2 sm:pt-0 sm:rounded-3xl overflow-hidden bg-landing bg-cover bg-no-repeat bg-center">
                <LandingNavbar />
                <div className="mt-14 font-TradeGothic font-bold text-center text-white">
                    <h2 className="text-2xl xs:text-4xl lg:text-[45px]">Helping Others</h2>
                    <h1 className="text-3xl xs:text-[40px] md:text-6xl mt-4 lg:mt-0 lg:text-[80px] lg:leading-normal uppercase mb-4">Live & Travel</h1>
                    <span className="text-sm xs:text-xl font-MontserratMedium">Special offers to suit your plan</span>
                </div>
            </header>
            <main className="-translate-y-32 mb-[200px]">
                <div className="container">
                    <div>
                        <SearchForFlightAndHotelBox />
                    </div>
                    <Section className="mt-20">
                        <SectionHead title="Plan your perfect trip" subTitle="Search Flights & Places Hire to our most popular destinations" btnTitle="See more places" to='/flights/all' />
                        <GridSystem parentClaasName="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
                            <LandingTripPlanBox imageSrc="/images/travels/travel_1.webp" title="Istanbul, Turkey" tags={["Flights", "Hotels", "Resorts"]} />
                            <LandingTripPlanBox imageSrc="/images/travels/travel_2.webp" title="Istanbul, Turkey" tags={["Flights", "Hotels", "Resorts"]} />
                            <LandingTripPlanBox imageSrc="/images/travels/travel_3.webp" title="Istanbul, Turkey" tags={["Flights", "Hotels", "Resorts"]} />
                            <LandingTripPlanBox imageSrc="/images/travels/travel_4.webp" title="Istanbul, Turkey" tags={["Flights", "Hotels", "Resorts"]} />
                            <LandingTripPlanBox imageSrc="/images/travels/travel_5.webp" title="Istanbul, Turkey" tags={["Flights", "Hotels", "Resorts"]} />
                            <LandingTripPlanBox imageSrc="/images/travels/travel_6.webp" title="Istanbul, Turkey" tags={["Flights", "Hotels", "Resorts"]} />
                        </GridSystem>
                    </Section>
                    <Section className="mt-20">
                        <GridSystem parentClaasName="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <LandingPrefectBox bgClass="bg-prefect_1" to="/flights/all" title="Flights" desc="Search Flights & Places Hire to our most popular destinations" btnTitle="Show Filghts" />
                            <LandingPrefectBox bgClass="bg-prefect_2" to="/hotels/all" title="Hotels" desc="Search Flights & Places Hire to our most popular destinations" btnTitle="Show Hotels" />
                        </GridSystem>
                    </Section>
                    <Section className="mt-20">
                        <SectionHead title="Reviews" subTitle="What people says about Golobe facilities" btnTitle="See All" to='/flights' />
                        <div className="mt-10">
                            <Swiper
                                modules={[Autoplay]}
                                spaceBetween={20}
                                slidesPerView={1}
                                loop
                                autoplay={{
                                    delay: 2500,
                                    disableOnInteraction: false,
                                }}
                                breakpoints={{
                                    640: {
                                        slidesPerView: 1,
                                        spaceBetween: 20,
                                    },
                                    768: {
                                        slidesPerView: 2,
                                        spaceBetween: 24,
                                    },
                                    1280: {
                                        slidesPerView: 3,
                                        spaceBetween: 24,
                                    },
                                }}
                            >
                                <SwiperSlide className="p-6">
                                    <LandingReviewBox imageSrc="/images/reviews/review_1.webp" title="“A real sense of community, nurtured”" desc="Really appreciate the help and support from the staff during these tough times. Shoutout to Katie for helping me always, even when I was out of the country. And always available when needed." />
                                </SwiperSlide>
                                <SwiperSlide className="p-6">
                                    <LandingReviewBox imageSrc="/images/reviews/review_2.webp" title="“The facilities are superb. Clean, slick, bright.”" desc="Really appreciate the help and support from the staff during these tough times. Shoutout to Katie for helping me always, even when I was out of the country. And always available when needed." />
                                </SwiperSlide>
                                <SwiperSlide className="p-6">
                                    <LandingReviewBox imageSrc="/images/reviews/review_3.webp" title="“A real sense of community, nurtured”" desc="Really appreciate the help and support from the staff during these tough times. Shoutout to Katie for helping me always, even when I was out of the country. And always available when needed." />
                                </SwiperSlide>
                                <SwiperSlide className="p-6">
                                    <LandingReviewBox imageSrc="/images/reviews/review_1.webp" title="“A real sense of community, nurtured”" desc="Really appreciate the help and support from the staff during these tough times. Shoutout to Katie for helping me always, even when I was out of the country. And always available when needed." />
                                </SwiperSlide>
                                <SwiperSlide className="p-6">
                                    <LandingReviewBox imageSrc="/images/reviews/review_2.webp" title="“The facilities are superb. Clean, slick, bright.”" desc="Really appreciate the help and support from the staff during these tough times. Shoutout to Katie for helping me always, even when I was out of the country. And always available when needed." />
                                </SwiperSlide>
                                <SwiperSlide className="p-6">
                                    <LandingReviewBox imageSrc="/images/reviews/review_3.webp" title="“A real sense of community, nurtured”" desc="Really appreciate the help and support from the staff during these tough times. Shoutout to Katie for helping me always, even when I was out of the country. And always available when needed." />
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </Section>
                </div>
            </main>
            <Footer />
        </motion.div>
    );
}
