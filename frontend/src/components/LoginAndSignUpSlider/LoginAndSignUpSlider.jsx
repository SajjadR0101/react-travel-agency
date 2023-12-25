import React, { memo } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination, Autoplay } from "swiper/modules";
import ImageCover from "../ImageCover/ImageCover";

export default memo(function LoginAndSignUpSlider() {
    return (
        <div className={`login-signup-slider relative`}>
            <Swiper
                className="rounded-3xl child:rounded-3xl"
                modules={[Pagination, Autoplay]}
                height={600}
                slidesPerView={1}
                spaceBetween={10}
                loop
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
            >
                <SwiperSlide>
                    <ImageCover src="/images/slider/slide_4.webp" alt="slider 1" wrapperClassName="h-[680px] overflow-hidden rounded-3xl" />
                </SwiperSlide>
                <SwiperSlide>
                    <ImageCover src="/images/slider/slide_2.webp" alt="slider 2" wrapperClassName="h-[680px] overflow-hidden rounded-3xl" />
                </SwiperSlide>
                <SwiperSlide>
                    <ImageCover src="/images/slider/slide_3.webp" alt="slider 3" wrapperClassName="h-[680px] overflow-hidden rounded-3xl" />
                </SwiperSlide>
            </Swiper>
        </div>
    );
})
