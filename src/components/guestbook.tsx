import { useEffect, useState } from "react";
import { getApiUrl } from "@/utils/getApiUrl";
import axios, { Method } from "axios";
import { timeConvertUtcToKst } from '@/utils/timezoneConvet';

const GuestBook = () => {
    const [guestBook, setGuestBook] = useState<Array<{
        id?: number,
        userId?: string,
        ip?: string,
        contents?: string,
        createdAt?: string
    }>>([]);

    useEffect(() => {
        loadGuestBook();
    }, []);

    const loadGuestBook = async () => {
        let url = getApiUrl(`/blog/guestbook`);
        const method: Method = "GET";
        const response = await axios({
            url,
            method,
        });

        const guestBooks = response.data.content;
        if (!guestBooks) return;
        setGuestBook(guestBooks);
    };

    const handleWriteButton = async () => {
        const writeInput = document.querySelector("#msg-input") as HTMLInputElement;
        if (writeInput.value == '') return;

        let url = getApiUrl(`/blog/guestbook`);
        const method: Method = "POST";
        try {
            const response = await axios({
                url,
                method,
                data: {
                    contents: writeInput.value
                }
            });
            alert("성공적으로 등록되었습니다.");
            loadGuestBook();
        } catch (e) {
            if (e.response.status === 403) {
                alert(e.response.data);
            } else {
                alert("예상치 못한 오류입니다. 관리자 문의 바랍니다.");
            }
        }

        writeInput.value = "";
    };

    return (
        <>
            <div
                style={{
                    margin: "10px 0 100px 0",
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
                        // display: "flex",
                        flexDirection: "column",
                        backgroundColor: "white",
                        border: "1px solid black",
                        marginTop: "5px"
                    }}
                    className='guestbook-box'
                >
                    {
                        guestBook.length !== 0 ?
                            guestBook.map((g, i) => {
                                return (
                                    <>
                                        <div style={{
                                            margin: "5px 5px 5px 5px"
                                        }}>
                                            <span>{g.contents}</span>
                                            <span style={{
                                                fontSize: '12px'
                                            }}> ({timeConvertUtcToKst(g.createdAt as string)})</span>
                                            <span style={{
                                                fontSize: '12px'
                                            }}> [작성자: {g.userId ? g.userId : 'Guest'}]</span>
                                        </div>
                                        <div
                                            style={{
                                                width: "100%",
                                                height: "2px",
                                                backgroundColor: "black",
                                                // 굵기
                                                opacity: "0.3",
                                            }}
                                        ></div>
                                    </>
                                )
                            })
                            : <></>
                    }
                </div>
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                    }}
                    className='enter-msg-box'>
                    <input
                        id="msg-input"
                        style={{
                            width: "100%",
                            border: "1px solid black",
                        }}
                        type="text"
                        className='msg-input'
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                handleWriteButton();
                            }
                        }}
                    />
                    <button
                        style={{
                            width: "5rem",
                            border: "1px solid black",
                        }}
                        className='send-msg-btn'
                        onClick={handleWriteButton}
                    >
                        남기기
                    </button>
                </div>
            </div>
        </>
    )
}

export default GuestBook;