import PaintFrame from "@/components/paint-frame";
import { SwiperSlide } from "swiper/react";

const SubmitPage = () => {
    const pageNumber = 3;
    return (
        <>
            <div className="swiper-slide" style={{
                position: "fixed",
            }}>
                <span style={{
                    color: "black",
                }}>마우스 우클릭 또는 휠을 누른채로 그림을 그려보세요.</span>
                <PaintFrame />
            </div>

        </>
    );
};

export default SubmitPage;