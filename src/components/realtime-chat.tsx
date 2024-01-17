import React, { useRef, useState, useEffect } from 'react';
import SocketIoClient from 'socket.io-client';

const RealTimeChat = () => {
    const socketRef = useRef(null);
    const chatRef = useRef(null);
    const chatScrollRef = useRef(false);
    const [connected, setConnected] = useState<boolean>(false);
    const otherUser: any[] = [];

    const handleChatSend = async () => {
        const chatInput = document.querySelector("#chat-input") as HTMLInputElement;
        if (chatInput.value == '') return;
        const socket: any = socketRef.current;
        if (socket == null) return;
        socket.emit("chat", {
            msg: chatInput.value
        });
        chatInput.value = "";
    };

    const chatScrollDown = () => {
        const chatUI: any = chatRef.current;
        if (chatUI == null) return;
        chatUI.scrollTop = chatUI.scrollHeight;
    }

    useEffect(() => {
        {/* @ts-ignore */ }
        const socket = SocketIoClient.connect(`${process.env.NEXT_PUBLIC_IP}:${process.env.NEXT_PUBLIC_Socket_Port}`, {
            secure: true,
            rejectUnauthorized: false,
        });
        socket.on("connect", () => {
            socketRef.current = socket;
            setConnected(true);
            socket.emit("chat_connect", "hello server")
        });

        socket.on("guest_enter", (data: { uid: string }) => {
            otherUser.push(data.uid);
            const chatBox: any = chatRef.current;
            const chatMsg: any = document.createElement("span")
            if (chatBox && chatMsg) {
                chatMsg.className = "chat-msg system-msg"
                chatMsg.innerHTML = `[system] ${data.uid}님이 채팅서버에 입장하였습니다.`
                chatBox.appendChild(chatMsg);
                chatScrollDown();
            }
        });

        socket.on("guest_exit", (data: { uid: string }) => {
            otherUser.splice(otherUser.indexOf(data.uid), 1);
        });

        socket.on("chat", (data: { uid: string, msg: string }) => {
            const chatBox: any = chatRef.current;
            const chatMsg: any = document.createElement("span")
            if (chatBox && chatMsg) {
                chatMsg.className = "chat-msg other-msg"
                chatMsg.innerHTML = `${data.uid} : ${data.msg}`
                chatBox.appendChild(chatMsg);
                chatScrollDown();
            }
        });

        socket.on("my_chat", (data: { msg: string }) => {
            const chatBox: any = chatRef.current;
            const chatMsg: any = document.createElement("span")
            if (chatBox && chatMsg) {
                chatMsg.className = "chat-msg my-msg"
                chatMsg.innerHTML = `나 : ${data.msg}`
                chatBox.appendChild(chatMsg);
                chatScrollDown();
            }
        });

        socket.on("connected", (data: any) => {
            const chatBox: any = chatRef.current;
            const chatMsg: any = document.createElement("span")
            if (chatBox && chatMsg) {
                chatMsg.className = "chat-msg system-msg"
                chatMsg.innerHTML = `[system] 채팅서버 연결에 성공하였습니다. 현재 인원은 ${data.users.length}명 입니다.`
                chatBox.appendChild(chatMsg);
                chatScrollDown();
            }
        });

        socket.on("disconnect", () => {
            setConnected(false);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <>
            실시간 채팅
            <div
                style={{
                    bottom: 0,
                    right: 0,
                    // width는 부모의 크기
                    marginTop: "5px"
                }}
                className="chat-box">
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
                    className='show-msg-box'
                    ref={chatRef}
                >

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
                                handleChatSend();
                            }
                        }}
                    />
                    <button
                        style={{
                            width: "5rem",
                            border: "1px solid black",
                        }}
                        className='send-msg-btn'
                        onClick={handleChatSend}
                    >
                        전송
                    </button>
                </div>
            </div>
        </>
    )
}

export default RealTimeChat;