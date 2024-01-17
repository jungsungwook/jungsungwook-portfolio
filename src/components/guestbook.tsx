const GuestBook = () => {

    return (
        <>
            <div
                style={{
                    margin: "10px 0 0 0",
                }}
                className="guestbook-area"
                >
                방명록
                <div
                    style={{
                        width: "100%",
                        maxWidth: "30rem",
                        height: "30rem",
                        maxHeight: "30rem",
                        overflow: "auto",
                        display: "flex",
                        flexDirection: "column",
                        backgroundColor: "white",
                        border: "1px solid black",
                    }}
                    className='guestbook-box'
                >
                    <span>[24/01/17 15:00:34] 안녕하세요 잘 보고 갑니다 ㅋㅋ</span>
                    <span>[24/01/17 17:21:19] 별 거 없는 거 같은데..</span>
                </div>
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                    }}
                    className='enter-msg-box'>
                    <input
                        id="chat-input"
                        style={{
                            width: "100%",
                            border: "1px solid black",
                        }}
                        type="text"
                        className='msg-input'
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                // handleChatSend();
                            }
                        }}
                    />
                    <button
                        style={{
                            width: "5rem",
                            border: "1px solid black",
                        }}
                        className='send-msg-btn'
                        // onClick={}
                    >
                        남기기
                    </button>
                </div>
            </div>
        </>
    )
}

export default GuestBook;