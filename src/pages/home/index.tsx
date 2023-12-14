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
            <MainFrame
                page={0}
            ></MainFrame>
        </>
    );
};

export default HomeIndex;