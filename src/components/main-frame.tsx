import React from 'react';
import Page_0 from '@/pages/page/page_0';
import Page_1 from '@/pages/page/page_1';
import Page_2 from '@/pages/page/page_2';

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
    const loadPage = (page: number) => {

    }
    return (
        <div className="main-frame">
            <div className="main-frame__page">
                <Page_0 currentPage={props.page}></Page_0>
                <Page_1 currentPage={props.page}></Page_1>
                <Page_2 currentPage={props.page}></Page_2>
            </div>
        </div>
    );
};

export default MainFrame;
