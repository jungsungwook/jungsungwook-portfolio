import React, { useEffect } from 'react';
import IndexPage from '@/pages/page/indexPage';
import ProfilePage from '@/pages/page/profilePage';
import TimelinePage from '@/pages/page/timelinePage';
import PortfolioPage from '@/pages/page/portfolioPage';
import SubmitPage from '@/pages/page/submitPage';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/pagination";
import { Mousewheel, Pagination } from "swiper";
import AboutPage from '@/pages/page/aboutPage';
import { useRecoilState } from 'recoil';
// import { enableScrollState } from '@/states/enableScroll';
import { set } from 'animejs';
import ProjectIndex from '@/pages/project';
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
    const [swiperObj, setSwiperObj] = React.useState<any>();
    // const [enableScroll, setEnableScroll] = useRecoilState(enableScrollState);

    // useEffect(() => {
    //     swiperObj?.mousewheel.enable();
    // }, [enableScroll])

    useEffect(() => {
        
    }, []);

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
                    }
                }
                modules={[Mousewheel, Pagination]}
                onSlideChange={(swiper) => {
                    // if (swiperObj == undefined) setSwiperObj(swiper);
                    // setCurrentPage(swiper.activeIndex);
                    // if (swiper.activeIndex == 2) {
                    //     swiper.mousewheel.disable();
                    // } else {
                    //     setEnableScroll(true);
                    //     swiper.mousewheel.enable();
                    // }
                }}
                className="main_swiper"
            >
                <div className="main_header">
                    <a href="/home" className="logo">
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
                            {/* @ts-ignore */}
                            <a href="#" onClick={()=> setCurrentPage(0)} className="en">
                                <span>
                                    Index
                                </span>
                            </a>
                        </li>
                        <li className={currentPage == 1 ? "on" : ""}>
                            {/* @ts-ignore */}
                            <a href="#" onClick={()=> setCurrentPage(0)} className="en">
                                <span>
                                    About
                                </span>
                            </a>
                        </li>
                        <li className={currentPage == 2 ? "on" : ""}>
                            {/* @ts-ignore */}
                            <a href="#" onClick={()=> setCurrentPage(0)} className="en">
                                <span>
                                    Career
                                </span>
                            </a>
                        </li>
                        <li className={currentPage == 3 ? "on" : ""}>
                            {/* @ts-ignore */}
                            <a href="#" onClick={()=> setCurrentPage(0)} className="en">
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
                    style={{
                        backgroundColor: "#f8f8f8",
                    }}
                ><IndexPage /></SwiperSlide>
                <SwiperSlide
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#f8f8f8",
                        overflow: "visible"
                    }}
                ><AboutPage /></SwiperSlide>
                {/* <SwiperSlide
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#f8f8f8",
                        overflow: "visible"
                    }}
                ><TimelinePage /></SwiperSlide> */}
                {/* <SwiperSlide><PortfolioPage /></SwiperSlide> */}
                <SwiperSlide><ProjectIndex></ProjectIndex></SwiperSlide>
                <SwiperSlide><SubmitPage /></SwiperSlide>
            </Swiper >
        </>
    );
};

export default MainFrame;
