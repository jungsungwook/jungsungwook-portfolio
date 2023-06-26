class Props {
    currentPage: number
}
const Page_2 = (props: Props) => {
    const pageNumber = 2;
    return (
        <div className={`Page_2 page-transition${props.currentPage == pageNumber ? ".active" : ""}`}>
            <div className="Page_2__image">
                <img src="https://cdn.imweb.me/upload/S201910012ff964777e0e3/62f9a36ea3cea.jpg" alt="Page_0__image"
                    style={{
                        width: "600px",
                        height: "400px",
                    }}
                />
            </div>
            <span>page_2</span>
        </div>
    );
};

export default Page_2;