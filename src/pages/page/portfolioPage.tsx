import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import "swiper/css/pagination";
import { Mousewheel, Pagination } from "swiper";
class Props {
    currentPage: number
}
const PortfolioPage = (props: Props) => {
    const pageNumber = 2;
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
                    포트폴리오 A
                </SwiperSlide>
                <SwiperSlide>
                    포트폴리오 B
                </SwiperSlide>
                <SwiperSlide>
                    포트폴리오 C
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default PortfolioPage;