import { isLoginState } from "@/states/is-login";
import axios, { Method } from "axios";
import { getCookie } from "cookies-next";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

const HeaderFrame = (token: any) => {
    const router = useRouter();
    const currentPath = usePathname();

    const [isLogin, setIsLoginState] = useRecoilState(isLoginState);

    useEffect(() => {
        const res = axios({
            method: 'get' as Method,
            headers: {
                Authorization: `Bearer ${token.token}`,
            },
            url: `/api/auth/islogin`,
        }).then((res) => {
            const result = res.data;
            if (result.statusCode == 200 || result.statusCode == '200') {
                setIsLoginState(true);
            }
        }).catch((e) => {
            setIsLoginState(false);
        });
    }, [currentPath]);

    return (
        <>
            <div className='main_header'
                style={{
                    position: "fixed",
                    display: "flex",
                    justifyContent: "space-between",
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 100,
                    flexDirection: "row",
                }}
            >
                <div className="main_header_contents2"
                    style={{
                        zIndex: 100,
                        marginLeft: "2rem",
                        marginTop: "2.5rem",
                        display: "flex",
                        gap: "2rem",
                        // height은 안에 있는 것들의 높이에 따라서 결정됨
                        height: "100%",
                    }}
                >
                    <a
                        id='home'
                        onClick={() => router.push("/home")}
                        style={{
                            fontWeight: currentPath == "/home" ? "bold" : "normal",
                            fontSize: "2rem",
                            color: "black",
                            position: "relative",
                        }}
                    >
                        HOME
                    </a>
                    <a
                        id='blog'
                        onClick={() => router.push("/blog")}
                        style={{
                            fontWeight: currentPath == "/blog" ? "bold" : "normal",
                            fontSize: "2rem",
                            color: "black",
                            position: "relative",
                        }}
                    >
                        BLOG
                    </a>
                    <a
                        id='project'
                        onClick={() => router.push("/project")}
                        style={{
                            fontWeight: currentPath == "/project" ? "bold" : "normal",
                            fontSize: "2rem",
                            color: "black",
                            position: "relative",
                        }}
                    >
                        PROJECT
                    </a>
                    {
                        isLogin ?
                            <a
                                id='signout'
                                onClick={() => {
                                    setIsLoginState(false);
                                    document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
                                    alert('로그아웃 되었습니다.');
                                }}
                                style={{
                                    fontWeight: currentPath == "/auth/signout" ? "bold" : "normal",
                                    fontSize: "2rem",
                                    color: "red",
                                    position: "relative",
                                }}
                            >
                                LOGOUT
                            </a>
                            : <a
                                id='signin'
                                onClick={() => router.push("/auth/signin")}
                                style={{
                                    fontWeight: currentPath == "/auth/signin" ? "bold" : "normal",
                                    fontSize: "2rem",
                                    color: "green",
                                    position: "relative",
                                }}
                            >
                                LOGIN
                            </a>
                    }
                </div>
                <div className="main_header_contents"
                    style={{
                        zIndex: 100,
                        marginRight: "2rem",
                        marginTop: "1rem",
                        marginBottom: "1rem",
                        gap: "1rem",
                        display: "flex",
                    }}
                >
                    <a
                        href="https://github.com/jungsungwook"
                        style={{
                            fontSize: "2rem",
                            color: "black",
                        }}
                    >
                        <img
                            src="/github-mark.png"
                            style={{
                                width: "50px",
                                height: "50px",
                            }}
                        />
                    </a>
                    <a
                        href="https://www.notion.so/jungsungwook/56a2ef1b6f71416196545592fec7440f"
                        style={{
                            fontSize: "2rem",
                            color: "black",
                        }}
                    >
                        <img
                            src="/notion_logo.png"
                            style={{
                                width: "50px",
                                height: "50px",
                            }}
                        />
                    </a>
                </div>
            </div>
        </>
    )
};

export default HeaderFrame;