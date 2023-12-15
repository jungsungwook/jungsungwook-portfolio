import React, { useRef, useState, useEffect } from 'react';
import SocketIoClient from 'socket.io-client';

/**
 * @todos
 * 3. 지우개 기능 
 * 4. 선 굵기 통일 및 조절 기능
 */
const PaintFrame = () => {
    const canvasRef = useRef(null);
    const otherCanvasContext: any = {}
    const contextRef = useRef(null);
    const [ctx, setCtx]: any = useState();
    const otherUser: any[] = [];

    const [isDrawing, setIsDrawing] = useState(false);
    const [connected, setConnected] = useState<boolean>(false);
    const socketRef = useRef(null);

    const colorRef = useRef("black");


    useEffect(() => {
        window.addEventListener("contextmenu", e => e.preventDefault());
        const backgroundCanvas = document.getElementById("background") as HTMLCanvasElement;
        const image = new Image();
        image.src = "background.png";
        const backctx = backgroundCanvas?.getContext("2d") as CanvasRenderingContext2D;
        image.onload = () => {
            backctx.drawImage(image, 0, 0, 2560, 1440);
        }
        const canvas: any = canvasRef.current;
        canvas.width = 2560;
        canvas.height = 1440;

        const context = canvas.getContext("2d");
        // 파란색
        context.strokeStyle = "black";
        context.lineWidth = 2.5;
        contextRef.current = context;

        setCtx(context);
        if (connected) { console.log('already connected'); return }
        // 소켓 통신 연결
        {/* @ts-ignore */ }
        const socket = SocketIoClient.connect(`${process.env.NEXT_PUBLIC_IP}:${process.env.NEXT_PUBLIC_Socket_Port}`, {
            secure: true,
            rejectUnauthorized: false,
        });
        socket.on("connect", () => {
            socketRef.current = socket;
            setConnected(true);
            socket.emit("message", "hello server")
        });

        socket.on("guest_enter", (data: { uid: string }) => {
            otherUser.push(data.uid);

            const newCanvas: any = document.createElement("canvas");
            newCanvas.id = data.uid + "_canvas";
            newCanvas.width = 2560;
            newCanvas.height = 1440;
            const newContext = newCanvas.getContext("2d") as CanvasRenderingContext2D;
            newContext.strokeStyle = "red";
            newContext.lineWidth = 2.5;
            otherCanvasContext[data.uid] = newContext;

            newCanvas.ref = newContext;

            const paintFrame = document.querySelector(".paint_frame") as HTMLDivElement;
            paintFrame.appendChild(newCanvas);

            // 마우스 포인터 생성
            const pointer = document.createElement("div");
            pointer.id = data.uid + "_pointer";
            pointer.className = "mouse_pointer";
            const img = document.createElement("img");
            img.src = "pointer.png";
            pointer.appendChild(img);
            paintFrame.appendChild(pointer);
        });

        socket.on("guest_exit", (data: { uid: string }) => {
            otherUser.splice(otherUser.indexOf(data.uid), 1);
            // 해당 uid를 가진 모든 요소 삭제
            // const canvas = document.getElementById(data.uid + "_canvas");
            // if (canvas) canvas.remove();
            const pointer = document.getElementById(data.uid + "_pointer");
            if (pointer) pointer.remove();

            delete otherCanvasContext[data.uid];
        });

        socket.on("message", (data: { uid: string, users: any, canvas: any }) => {
            loadCanvas(data.canvas);
            const users = data.users;
            for (const user of users) {
                if (user !== data.uid) {
                    otherUser.push(user);
                    const newCanvas: any = document.createElement("canvas");
                    newCanvas.id = user + "_canvas";
                    newCanvas.width = 2560;
                    newCanvas.height = 1440;
                    const newContext = newCanvas.getContext("2d") as CanvasRenderingContext2D;
                    newContext.strokeStyle = "red";
                    newContext.lineWidth = 2.5;
                    otherCanvasContext[user] = newContext;

                    newCanvas.ref = newContext;

                    const paintFrame = document.querySelector(".paint_frame") as HTMLDivElement;
                    paintFrame.appendChild(newCanvas);

                    const pointer = document.createElement("div");
                    pointer.id = user + "_pointer";
                    pointer.className = "mouse_pointer";

                    const img = document.createElement("img");
                    img.src = "pointer.png";
                    pointer.appendChild(img);

                    paintFrame.appendChild(pointer);
                } else {
                    console.log(`My uid is ${data.uid}`)
                }
            }
        });

        socket.on("drawing", (data: { uid: string, offsetX: number, offsetY: number, color: string, lineWidth: number, opt: any }) => {
            const pointer = document.getElementById(data.uid + "_pointer");
            if (pointer) {
                pointer.style.left = data.offsetX + "px";
                pointer.style.top = data.offsetY + "px";
            }
            const otherContext = otherCanvasContext[data.uid];
            if (!otherContext) {
                otherUser.push(data.uid);
                const newCanvas: any = document.createElement("canvas");
                newCanvas.id = data.uid + "_canvas";
                newCanvas.width = 2560;
                newCanvas.height = 1440;
                const newContext = newCanvas.getContext("2d") as CanvasRenderingContext2D;
                newContext.strokeStyle = data.color ? data.color : "red";
                newContext.lineWidth = 2.5;
                otherCanvasContext[data.uid] = newContext;

                newCanvas.ref = newContext;

                const paintFrame = document.querySelector(".paint_frame") as HTMLDivElement;
                paintFrame.appendChild(newCanvas);
            }
            try {
                otherContext.lineWidth = data.lineWidth ? data.lineWidth : 2.5;
                otherContext.globalCompositeOperation = data.opt;
                otherContext.strokeStyle = data.color ? data.color : "red";
                otherContext.lineTo(data.offsetX, data.offsetY);
                otherContext.stroke();
            } catch (e) {
                console.log(e);
                alert("error");
            }

        });

        socket.on("mouse_move", (data: { uid: string, offsetX: number, offsetY: number }) => {
            // 마우스 포인터 이동
            // id가 uid이며 class가 mouse_pointer인 요소를 찾아서 위치를 변경
            const pointer = document.getElementById(data.uid + "_pointer");
            if (pointer) {
                pointer.style.left = `${data.offsetX}px`;
                pointer.style.top = `${data.offsetY}px`;
            }
            const otherContext = otherCanvasContext[data.uid];
            if (!otherContext) {
                otherUser.push(data.uid);
                const newCanvas: any = document.createElement("canvas");
                newCanvas.id = data.uid + "_canvas";
                newCanvas.width = 2560;
                newCanvas.height = 1440;
                const newContext = newCanvas.getContext("2d") as CanvasRenderingContext2D;
                newContext.strokeStyle = "red";
                newContext.lineWidth = 2.5;
                otherCanvasContext[data.uid] = newContext;

                newCanvas.ref = newContext;

                const paintFrame = document.querySelector(".paint_frame") as HTMLDivElement;
                paintFrame.appendChild(newCanvas);
                return;
            }
            otherContext.beginPath();
            otherContext.moveTo(data.offsetX, data.offsetY);
        });

        socket.on("sync_canvas", (data: { canvas: any }) => {
            loadCanvas(data.canvas);
        });

        const onResize = () => {
            // 모든 canvas 가져오기
            const canvasList = document.querySelectorAll("canvas") as any;
            for (const canvas of canvasList) {
                canvas.width = 2560;
                canvas.height = 1440;
            }

            const backgroundCanvas = document.getElementById("background") as HTMLCanvasElement;
            const image = new Image();
            image.src = "background.png";
            const backctx = backgroundCanvas.getContext("2d") as CanvasRenderingContext2D;
            image.onload = () => {
                backctx.drawImage(image, 0, 0, 2560, 1440);
            }

            socket.emit("sync_canvas", {});
        };

        window.addEventListener('resize', onResize, false);
        onResize();
        return () => {
            // 소켓 연결 해제
            socket.disconnect();
        };
    }, []);

    const startDrawing = () => {
        setIsDrawing(true);
    };

    const finishDrawing = () => {
        setIsDrawing(false);
    };

    const setColor = (color: string) => {
        if (color == 'erase') {
            ctx.lineWidth = 20;
            ctx.globalCompositeOperation = "destination-out";
            return;
        } else {
            ctx.globalCompositeOperation = "source-over";
            ctx.lineWidth = 2.5;
        }
        colorRef.current = color;
    };

    const loadCanvas = (
        imageData: any
    ) => {
        const canvas = document.getElementById("load_canvas") as HTMLCanvasElement;
        if (!canvas) return;
        const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
        const image = new Image();
        image.src = imageData;
        image.onload = () => {
            ctx.drawImage(image, 0, 0, 2560, 1440);
        }
    }

    const popModal = () => {
        const modal = document.createElement("div");
        modal.className = "modal_frame";
        modal.id = "modal_frame";
        const modalContent = document.createElement("div");
        modalContent.className = "modal_content";
        modalContent.id = "modal_content";
        const modalTitle = document.createElement("div");
        modalTitle.className = "modal_title";
        modalTitle.id = "modal_title";
        modalTitle.innerText = "이 페이지는 무엇인가요?";
        const modalBody = document.createElement("div");
        modalBody.className = "modal_body";
        modalBody.id = "modal_body";
        const modalBodyContent = document.createElement("div");
        modalBodyContent.className = "modal_body_content";
        modalBodyContent.id = "modal_body_content";
        modalBodyContent.innerText = "NextJS + Express + Socket.io를 이용한 그림판입니다.\n\n여러명이 동시에 접속할 경우 자신과 상대방의 마우스 포인터와 그림이 실시간으로 보여집니다.\n\n그린 그림은 서버에서도 저장중이니 재접속하여도 남아있습니다.\n\n지우개는 자신의 그림만 지울 수 있습니다.\n\n 이제 방명록을 남겨보세요!"
        const modalButton = document.createElement("div");
        modalButton.className = "modal_button";
        modalButton.id = "modal_button";
        const modalButtonImage = document.createElement("img");
        modalButtonImage.className = "modal_button_image";
        modalButtonImage.id = "modal_button_image";
        modalButtonImage.src = "okbutton.png";
        modalButton.appendChild(modalButtonImage);
        modalButton.onclick = () => {
            const modal = document.getElementById("modal_frame") as HTMLDivElement;
            modal.remove();
        }
        modalBody.appendChild(modalBodyContent);
        modalContent.appendChild(modalTitle);
        modalContent.appendChild(modalBody);
        modalContent.appendChild(modalButton);
        modal.appendChild(modalContent);
        const body = document.querySelector("body") as HTMLBodyElement;
        body.appendChild(modal);

    }

    const drawing = ({ nativeEvent }: any) => {
        const { offsetX, offsetY } = nativeEvent;
        if (ctx) {
            ctx.strokeStyle = colorRef.current ? colorRef.current : "black";
            if (!isDrawing) {
                ctx.beginPath();
                ctx.moveTo(offsetX, offsetY);
                try {
                    {/* @ts-ignore */ }
                    socketRef.current.emit("mouse_move", { offsetX, offsetY });
                } catch (e) { }
            } else {
                if (ctx.globalCompositeOperation == "destination-out") {
                    ctx.lineTo(offsetX, offsetY);
                    ctx.stroke();
                }
                ctx.lineTo(offsetX, offsetY);
                ctx.stroke();
                if (socketRef.current) {
                    {/* @ts-ignore */ }
                    socketRef.current.emit("drawing",
                        {
                            offsetX,
                            offsetY,
                            color: colorRef.current ? colorRef.current : "black",
                            lineWidth: ctx.lineWidth,
                            opt: ctx.globalCompositeOperation,
                        });
                }
            }

        }
    };

    return (
        <>
            <div className="paint_frame">
                <canvas
                    ref={canvasRef}
                    onMouseDown={startDrawing}
                    onMouseUp={finishDrawing}
                    onMouseMove={drawing}
                    onMouseLeave={finishDrawing}
                    style={{
                        zIndex: 99,
                    }}
                />
                <canvas
                    id="load_canvas"
                    width={2560}
                    height={1440}
                    style={{
                        zIndex: 98,
                    }}
                />
                <canvas
                    id="background"
                    width={2560}
                    height={1440}
                />
            </div>
            <div className="paint_tool_frame">
                <div style={{
                    backgroundColor: "red",
                }}
                    onClick={() => setColor("red")}
                />
                <div style={{
                    backgroundColor: "blue",
                }}
                    onClick={() => setColor("blue")}
                />
                <div style={{
                    backgroundColor: "green",
                }}
                    onClick={() => setColor("green")}
                />
                <div style={{
                    backgroundColor: "yellow",
                }}
                    onClick={() => setColor("yellow")}
                />
                <div style={{
                    backgroundColor: "black",
                }}
                    onClick={() => setColor("black")}
                />
            </div>
            <div className="eraser_tool_frame">
                <div
                    onClick={() => popModal()}>
                    <img src="info.png" />
                </div>
                <div
                    onClick={() => setColor("erase")}>
                    <img src="eraser.png" />
                </div>
            </div>
        </>
    );
};

export default PaintFrame;