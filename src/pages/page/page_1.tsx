class Props {
    currentPage: number
}
const Page_1 = (props: Props) => {
    const pageNumber = 1;
    return (
        <div className={`Page_1 page-transition${props.currentPage == pageNumber ? ".active" : ""}`}>
            <div className="Page_1__image">
                <img src="https://product.cdn.cevaws.com/var/storage/images/media/adaptil-2017/images/www-ww/shutterstock_395310793-3-2/3547034-1-www-WW/shutterstock_395310793-3-2.jpg" alt="Page_1__image"
                    style={{
                        width: "600px",
                        height: "400px",
                    }}
                />
            </div>
            <span>page_1</span>
        </div>
    );
};

export default Page_1;