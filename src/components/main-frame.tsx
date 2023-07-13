import React, { useEffect } from 'react';
import IndexPage from '@/pages/page/indexPage';
import ProfilePage from '@/pages/page/profilePage';
import CareerPage from '@/pages/page/careerPage';
import PortfolioPage from '@/pages/page/portfolioPage';
import SubmitPage from '@/pages/page/submitPage';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/pagination";
import { Mousewheel, Pagination } from "swiper";
import AboutPage from '@/pages/page/aboutPage';
/**
 * MainFrame은 페이지의 메인 프레임을 구성하는 컴포넌트입니다.
 * @feature
 * 1. 스크롤 시 다음 페이지를 보여줍니다.
 * 2. 다음 페이지를 보여줄 때 슬라이드 애니메이션을 적용합니다.
 * 3. 페이지 정보는 props로 전달받습니다.
 */
class MainFrameProps {
    /**
     * 현재 페이지의 인덱스입니다.
     */
    page: number | undefined;
}
const MainFrame = (props: MainFrameProps) => {
    // 현재 페이지의 인덱스
    const [currentPage, setCurrentPage] = React.useState(props.page);

    const loadPage = (page: number) => {
        // 페이지를 로드합니다.
        // 페이지를 로드할 때 슬라이드 애니메이션을 적용합니다.
        console.log(page)
    }

    useEffect(() => {
        // 페이지가 변경되면 페이지를 로드합니다.
        loadPage(currentPage as number);
    }, [currentPage]);
    return (
        <>
            <Swiper
                direction={"vertical"}
                slidesPerView={1}
                spaceBetween={0}
                mousewheel={true}
                pagination={
                    {
                        clickable: true,
                        observer: true,	// 추가
                        observeParents: true,	// 추가
                    }
                }
                modules={[Mousewheel, Pagination]}
                onSlideChange={(swiper) => {
                    setCurrentPage(swiper.activeIndex);
                }}
                className="main_swiper"
            >
                <div className="main_header">
                    <a herf="/home" className="logo">
                        <div className="img">
                            <img src="/Sun.png" />
                        </div>
                        <span className="en">
                            <b>S</b>
                            <b>U</b>
                            <b>N</b>
                            <b>G </b>
                            <b>W</b>
                            <b>O</b>
                            <b>O</b>
                            <b>K</b>
                        </span>
                    </a>
                    <ul className="gnb">
                        <li className={currentPage == 0 ? "on" : ""}>
                            <a href="#" onclick="setCurrentPage(0)" className="en">
                                <span>
                                    Index
                                </span>
                            </a>
                        </li>
                        <li className={currentPage == 1 ? "on" : ""}>
                            <a href="#" onclick="setCurrentPage(0)" className="en">
                                <span>
                                    About
                                </span>
                            </a>
                        </li>
                        <li className={currentPage == 2 ? "on" : ""}>
                            <a href="#" onclick="setCurrentPage(0)" className="en">
                                <span>
                                    Career
                                </span>
                            </a>
                        </li>
                        <li className={currentPage == 3 ? "on" : ""}>
                            <a href="#" onclick="setCurrentPage(0)" className="en">
                                <span>
                                    Portfolio
                                </span>
                            </a>
                        </li>
                        <li className={currentPage == 4 ? "on" : ""}>
                            <a href="#" className="en">
                                <span>
                                    Submit
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>
                <SwiperSlide
                    style ={{
                        backgroundColor: "#f8f8f8",
                    }}
                ><IndexPage /></SwiperSlide>
                <SwiperSlide
                    style ={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#f8f8f8",
                        overflow: "visible"
                    }}
                ><AboutPage /></SwiperSlide>
                <SwiperSlide
                    style ={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#f8f8f8",
                        overflow: "visible"
                    }}
                ><CareerPage /></SwiperSlide>
                <SwiperSlide><PortfolioPage /></SwiperSlide>
                <SwiperSlide><SubmitPage /></SwiperSlide>
            </Swiper >
        </>
    );
};

export default MainFrame;
