import { useRecoilState } from "recoil";
import { isLoginState } from "@/states/is-login";
import { ParallaxProvider, useParallax } from "react-scroll-parallax";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import MainFrame from "@/components/main-frame";
import Head from "next/head";

const HomeIndex = () => {
    const [isLogin, setIsLoginState] = useRecoilState(isLoginState);

    return (
        <>
            <Head>
                <meta property="og:url" content="https://sungwook.net/" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://avatars.githubusercontent.com/u/20926860?v=4" />
                <meta property="og:description" content="공유기능 | 열심히 코드를 공부합시다." />
                <title>정성욱의 포트폴리오 웹사이트</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>

                <MainFrame
                    page={0}
                ></MainFrame>
            
        </>
    );
};

export default HomeIndex;