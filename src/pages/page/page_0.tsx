class Props {
    currentPage: number
}
const Page_0 = (props: Props) => {
    const pageNumber = 0;
    return (
        // 만약 props.currentPage가 0이면 이 컴포넌트를 보여주고, 아니면 보여주지 않습니다.
        // 기본적으로 클래스명은 Page_0이며 보여질 땐 page-transition.active가 추가되고 아닐 땐 page-transition 이다.
        // page-transition.active는 페이지가 스크롤되어 보여질 때 추가되는 클래스명이며, 이는 페이지가 스크롤되어 보여질 때 애니메이션을 적용하기 위함이다.
        <div className={`Page_0 page-transition${props.currentPage == pageNumber ? ".active" : ""}`}>
            <div className="Page_0__image">
                <img src="https://cdn.imweb.me/upload/S201910012ff964777e0e3/62f9a36ea3cea.jpg" alt="Page_0__image"
                    style={{
                        width: "600px",
                        height: "400px",
                    }}
                />
            </div>
            <span>page_0</span>
        </div>
    );
};

export default Page_0;