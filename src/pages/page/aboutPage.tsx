import { Swiper, SwiperSlide } from "swiper/react";
import styled from "styled-components";
import 'swiper/css/effect-cards';
import { Mousewheel, Pagination, Navigation, Parallax, EffectCards } from "swiper";
import ProfilePage from "./profilePage";
import SkillPage from "./skillPage";
import CareerPage from "./careerPage";
import ExperiencePage from "./experiencePage";
import AwardPage from "./awardPage";

const AboutPage = () => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                // backgroundColor: "red",
                fontFamily: "SUITE-Regular"
            }}
        >
            <div className="card-swiper-slide">
                <Swiper
                    effect={'cards'}
                    grabCursor={true}
                    modules={[EffectCards]}
                    className="mySwiper-card"
                    style={{
                        width: "480px",
                        height: "640px",
                    }}
                >
                    <SwiperSlide
                        className="swiper-card"
                        style={{
                            backgroundColor: "white",
                            // 테두리 검은색
                            border: "1px solid black",
                            color: "black",
                        }}
                    >
                        <ProfilePage />
                    </SwiperSlide>
                    <SwiperSlide
                        className="swiper-card"
                        style={{
                            backgroundColor: "white",
                            border: "1px solid black",
                        }}
                    >
                        <SkillPage />
                    </SwiperSlide>
                    <SwiperSlide
                        className="swiper-card"
                        style={{
                            backgroundColor: "white",
                            border: "1px solid black",
                        }}
                    >
                        <ExperiencePage />
                    </SwiperSlide>
                    <SwiperSlide
                        className="swiper-card"
                        style={{
                            backgroundColor: "white",
                            border: "1px solid black",
                        }}
                    >
                        <AwardPage />
                    </SwiperSlide>
                    <SwiperSlide
                        className="swiper-card"
                        style={{
                            backgroundColor: "white",
                            border: "1px solid black",
                        }}
                    >
                        <CareerPage />
                    </SwiperSlide>
                </Swiper>
            </div >
            <div className="arrow"
                style={{
                    position: "absolute",
                    // top: "50%",
                    // right: "20%",
                    zIndex: 100,
                    // fontSize: "2rem",
                    // color: "black",
                }}
            >
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className="description"
                style={{
                    position: "absolute",
                    top: "90%",
                    right: "50%",
                    zIndex: 100,
                    fontSize: "1.2rem",
                    color: "black",
                    transform: "translate(50%, -50%)",
                }}
            >
                <p>카드를 마우스로 넘겨보세요.</p><p />
            </div>
        </div>
    );
}

export default AboutPage;