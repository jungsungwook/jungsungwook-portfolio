import React from 'react';
import Page_0 from '@/pages/page/page_0';
import Page_1 from '@/pages/page/page_1';
import Page_2 from '@/pages/page/page_2';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/pagination";
import { Mousewheel, Pagination } from "swiper";
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
    page: number;
}
const MainFrame = (props: MainFrameProps) => {
    // 현재 페이지의 인덱스
    const [currentPage, setCurrentPage] = React.useState(props.page);
    // 페이지의 인덱스를 변경합니다.
    const loadPage = (page: number) => {

    }
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
                            <a href="/home" className="en">
                                <span>
                                    Index
                                </span>
                            </a>
                        </li>
                        <li className={currentPage == 1 ? "on" : ""}>
                            <a href="/home" className="en">
                                <span>
                                    Portfolio
                                </span>
                            </a>
                        </li>
                        <li className={currentPage == 2 ? "on" : ""}>
                            <a href="/home" className="en">
                                <span>
                                    Career
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>
                <SwiperSlide><Page_0 /></SwiperSlide>
                <SwiperSlide><Page_1 /></SwiperSlide>
                <SwiperSlide><Page_2 /></SwiperSlide>
            </Swiper >
        </>
    );
};

export default MainFrame;
