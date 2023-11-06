const CardFrame = (props: {
    title: string,
    description: string,
}) => {
    return (
        <>
            <div className="pr-container">
                <div className="card">
                    <div className="imgBx">
                        <img src="" />
                    </div>
                    <div className="contentBx"
                        style={{
                        }}
                    >
                        <h2>{props.title}</h2>
                        <div className="size">
                            <h3>Size :</h3>
                            <span>7</span>
                            <span>8</span>
                            <span>9</span>
                            <span>10</span>
                        </div>
                        <div className="color">
                            <h3>Color :</h3>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <a href="#">Buy Now</a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CardFrame