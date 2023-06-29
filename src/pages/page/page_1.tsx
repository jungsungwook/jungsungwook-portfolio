import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import "swiper/css/pagination";
import { Mousewheel, Pagination } from "swiper";
class Props {
    currentPage: number
}
const Page_1 = (props: Props) => {
    const pageNumber = 1;

    return (
        <div className="swiper-slide">
            <Swiper
                direction={"horizontal"}
                slidesPerView={1}
                spaceBetween={30}
                mousewheel={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                <SwiperSlide>
                    Slide A
                </SwiperSlide>
                <SwiperSlide>
                    Slide B
                </SwiperSlide>
                <SwiperSlide>
                    Slide C
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Page_1;