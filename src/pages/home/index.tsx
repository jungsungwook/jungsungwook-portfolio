import { useRecoilState } from "recoil";
import { isLoginState } from "@/states/is-login";
import { ParallaxProvider, useParallax } from "react-scroll-parallax";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import MainFrame from "@/components/main-frame";
import Head from "next/head";

const HomeIndex = () => {
    // const [isLogin, setIsLoginState] = useRecoilState(isLoginState);

    return (
        <>
            <div className="main_header_contents"
                style={{
                    position: "absolute",
                    top: "0",
                    right: "0",
                    zIndex: 100,
                    marginRight: "2rem",
                    marginTop: "2rem",
                    gap: "1rem",
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

            <MainFrame
                page={0}
            ></MainFrame>
        </>
    );
};

export default HomeIndex;