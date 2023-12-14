import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
class Props {
    currentPage?: number
}
import { Chrono } from "react-chrono";
import { SwiperSlide } from "swiper/react";
import { useRecoilState } from "recoil";
import { enableScrollState } from "@/states/enableScroll";

const items = [
    {
        title: "2016",
        cardTitle: "2016 (19살)",
        cardDetailedText: <div style={{
            paddingBottom: '10rem',
        }}>
            <div className="timeline-description">
                <span className="td-title">처음으로 프로그래밍을 접하게 되고 C, JAVA와 알고리즘을 공부하게 되었습니다.</span>
                <span className="td-description"></span>
            </div>
            <div className="timeline-description">
                <span className="td-description">- 국민대학교 제1회 전국 알고리즘 경진대회 본선 진출</span>
            </div>
            <div className="timeline-description">
                <span className="td-title">- 정보처리기능사 및 OCJP 취득</span>
                <span className="td-description" ></span>
            </div>
            <div className="timeline-description">
                <span className="td-title">- 방산고등학교 졸업</span>
                <span className="td-description"></span>
            </div>
        </div>

    }, {
        title: "2017",
        cardTitle: "2017 (20살)",
        cardDetailedText: <div>
            <div className="timeline-description">
                <span className="td-title">처음으로</span>
                <span className="td-description"></span>
            </div>
            <div className="timeline-description">
                <span className="td-title">- 강남대학교 정보기술 및 응용 학술제 우수상 수상(1분기)</span>
                <span className="td-description"></span>
            </div>
            <div className="timeline-description">
                <span className="td-title">- 강남대학교 정보기술 및 응용 학술제 우수상 수상(2분기)</span>
                <span className="td-description"></span>
            </div>
        </div>
    },
    {
        title: "2018",
        cardTitle: "2018 (21살)",
        cardDetailedText: <div>
            <div className="timeline-description">
                <span className="td-title">- 강남대학교 소프트웨어응용학부 가상현실 학술 동아리 CAVE 부회장</span><br />
                <span className="td-description">강남대학교 소프트웨어응용학부 제1회 가상현실컨텐츠 개발전시회 기획 및 운영총괄.</span><br />
                <span className="td-description">매 주 가상현실 및 증강현실 관련 세미나 진행 및 참여</span>
            </div>
            <div className="timeline-description">
                <span className="td-title">- 강남대학교 소프트웨어응용학부 제1회 가상현실 컨텐츠 개발전시회 기획 및 운영총괄</span><br />
                <span className="td-description">동아리 내 팀원들을 모아 개발팀들을 만들고 여러 게임들을 개발한 뒤 학부의 지원을 통해 전교생을 참여 대상으로 교내 전시회를 주최하였으며 운영 및 개발팀 멘토를 담당하였습니다.</span>
            </div>
            <div className="timeline-description">
                <span className="td-title">- 강남대학교 Wel-Tech 사업부 IOT 개발팀장</span><br />
                <span className="td-description">기업과 연계하여 시제품 IOT제품의 API를 이용하여 웹서버를 통해 자체 Client개발 및 통신환경구축</span>
            </div>
            <div className="timeline-description">
                <span className="td-title">- 강남대학교 소프트웨어응용학부 교외 홍보</span><br />
                <span className="td-description">참인재대학 소속으로 강남대학교 소프트웨어응용학부를 대표해 </span><br />
                <span className="td-description">근처 고등학교 학생들을 대상으로 소프트웨어학부 소개 및 홍보 발표 진행하였습니다</span>
            </div>
            <div className="timeline-description">
                <span className="td-title">- 강남대학교 소프트웨어응용학부 JAVA 전공 멘토</span><br />
                <span className="td-description">전공수업 JAVA프로그래밍 강의 수업보조 및 멘토 활동</span>
            </div>
            <div className="timeline-description">
                <span className="td-title">- 강남대학교 정보기술 및 응용 학술제 장려상 수상(1분기)</span><br />
                <span className="td-description"></span>
            </div>
            <div className="timeline-description">
                <span className="td-title">- 강남대학교 정보기술 및 응용 학술제 우수상 수상(2분기)</span><br />
                <span className="td-description"></span>
            </div>
        </div>
    },
    {
        title: "2019",
        cardTitle: "2019 (22살)",
        cardDetailedText: <div>
            <div className="timeline-description">
                <span className="td-title">- 강남대학교 소프트웨어응용학부 가상현실 학술 동아리 CELL 회장</span><br />
                <span className="td-description">매 주 인공지능 관련 세미나 진행 및 참여</span>
            </div>
            <div className="timeline-description">
                <span className="td-title">- 강남대학교 학습리더 전공특강 강연</span><br />
                <span className="td-description">강남대학교 교수학습지원센터(CTL) 소속으로 교내 학부생을 대상으로 1년간 2회 활동.</span><br />
                <span className="td-description">공부방법, 진로 커리큘럼 등 여러가지 정보 및 방안을 제시하는 강의를 진행하였습니다</span>
            </div>
            <div className="timeline-description">
                <span className="td-title">- 강남대학교 소프트웨어응용학부 웹 프로그래밍 전공 멘토</span><br />
                <span className="td-description">전공수업 웹프로그래밍 강의 수업보조 및 멘토 활동</span>
            </div>
            <div className="timeline-description">
                <span className="td-title">- 강남대학교 기초교양 Python 과목 멘토</span><br />
                <span className="td-description">전교생 대상 필수기초교양과목 python 멘토 활동</span>
            </div>
            <div className="timeline-description">
                <span className="td-title">- 강남대학교 SW멘토링 멘토</span><br />
                <span className="td-description">Python 수강자 대상 멘토링 진행</span>
            </div>
            <div className="timeline-description">
                <span className="td-title">- 강남대학교 정보기술 및 응용 학술제 최우수상 수상(1분기)</span>
                <span className="td-description"></span>
            </div>
            <div className="timeline-description">
                <span className="td-title">- 강남대학교 정보기술 및 응용 학술제 최우수상 수상(2분기)</span>
                <span className="td-description"></span>
            </div>
        </div>
    },
    {
        title: "2020",
        cardTitle: "2020 (23살)",
        cardDetailedText: <div>
            <div className="timeline-description">
                <span className="td-title">- 라온시큐어 품질기획팀 인턴</span><br />
                <span className="td-description">보안프로그램(Key#biz, Key#nxWireless, Transkey(보안키보드)) 제품 TC 작성 및 테스트 수행</span>
            </div>
            <div className="timeline-description">
                <span className="td-title">- 씨큐브코딩 송도국제도시센터 전임 강사</span><br />
                <span className="td-description">초/중/고 및 성인 대상 C, Python, JAVA 강의</span>
            </div>
        </div>
    },
    {
        title: "2021",
        cardTitle: "2021 (24살)",
        cardDetailedText: <div>
            <div className="timeline-description">
                <span className="td-title">- 라임프렌즈 웹개발팀 입사(병역특례 조건)</span>
                <span className="td-description">담당 업무 : NodeJS 기반 restapi 서버개발 및 서버사이드(파이썬) 개발</span>
                <span className="td-description">사용 기술 : NodeJS, Express, Python, Django, MySQL, MongoDB, AWS</span>
                <span className="td-title">프로젝트</span>
                <span className="td-description">1. 데이터바우처 국가산업</span>
                <span className="td-description">2. 클래스Q 서비스 신규 개발</span>
            </div>
        </div>
    },
    {
        title: "2022",
        cardTitle: "2022 (25살)",
        cardDetailedText: <div>
            <li>- 제21회 강남대학교 정보기술 및 응용 학술제 우수상 수상</li>
        </div>
    },
    {
        title: "2023",
        cardTitle: "2023 (26살)",
        cardDetailedText: <div>
            <li>- 제21회 강남대학교 정보기술 및 응용 학술제 우수상 수상</li>
        </div>
    }
]

const TimelinePage = (props: Props) => {
    const [enableScroll, setEnableScroll] = useRecoilState(enableScrollState);
    // 화면 사이즈가 바뀌었을 때
    useEffect(() => {
        window.addEventListener('resize', () => {
            const chronoCard = document.querySelector('.chrono-card') as HTMLElement;
            if (chronoCard) {
                chronoCard.style.height = `${window.innerHeight * 0.5}px`;
                chronoCard.style.width = `${window.innerWidth * 0.5}px`;
            }
        });
    }, []);

    return (
        <div className="TimelineDiv" style={{
            height: '-webkit-fill-available',
            width: '100%',
            marginBottom: '3rem',
            fontFamily: 'SUITE-Regular',
        }}>
            <Chrono
                items={items}
                slideShow
                slideItemDuration={4500}
                // mode="HORIZONTAL"
                mode="VERTICAL_ALTERNATING"
                // enableOutline
                fontSizes={{
                    cardText: '2rem',
                    title: '2rem',
                    cardTitle: '1.5rem',
                    cardSubtitle: '2rem',
                }}
                // cardHeight={window.innerHeight * 0.5}
                cardWidth={window.innerWidth * 0.5}
                classNames={{
                    card: "chrono-card",
                }}
                mediaSettings={{ align: 'right', fit: 'contain' }}
                useReadMore
                onScrollEnd={() => {
                    setEnableScroll(!enableScroll);
                }}
            />
        </div>
    );
};

export default TimelinePage;