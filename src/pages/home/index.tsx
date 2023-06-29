import { useRecoilState } from "recoil";
import { isLoginState } from "@/states/is-login";
import { ParallaxProvider, useParallax } from "react-scroll-parallax";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import MainFrame from "@/components/main-frame";

const HomeIndex = () => {
    const [isLogin, setIsLoginState] = useRecoilState(isLoginState);

    return (
        <div className="main_wrap">
            <div className="side_menu">
                <div className="site_map_btn">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div className="container">
                    <ul>
                        <li data="1번"></li>
                        <li data="2번"></li>
                    </ul>
                </div>
            </div>
            <MainFrame
                page={0}
            ></MainFrame>
        </div>
    );
};

export default HomeIndex;