import { SwiperSlide } from "swiper/react";
class Props {
    currentPage: number
}
const Page_2 = (props: Props) => {
    const pageNumber = 2;
    return (
        <div className="swiper-slide">
            page 2
        </div>
    );
};

export default Page_2;