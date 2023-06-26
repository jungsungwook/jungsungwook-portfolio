import { useRecoilState } from "recoil";
import { isLoginState } from "@/states/is-login";
import { ParallaxProvider, useParallax } from "react-scroll-parallax";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import MainFrame from "@/components/main-frame";

const HomeIndex = () => {
    const [isLogin, setIsLoginState] = useRecoilState(isLoginState);
    const [currentPage, setCurrentPage] = useState(0);
    const [detectScroll, setDetectScroll] = useState({
        direction: 0,
    });
    const targetRef = useRef<HTMLDivElement>(null);
    const handleWheel = (e) => {
        setDetectScroll({
            direction: e.deltaY,
        });
    }
    const isScroll = useRef<boolean>(false);

    const scrollEvent = (isUp: boolean) => {
        if (isScroll.current) return ;
        else {
            isScroll.current = true;
            if (isUp) {
                setCurrentPage(currentPage + 1);
            } else {
                setCurrentPage(currentPage - 1);
            }
            setTimeout(() => {
                isScroll.current = false;
            }, 100);
        }
    }

    useEffect(() => {
        const timer = setInterval(() => {
            window.addEventListener("mousewheel", handleWheel);
        }, 100);
        return () => {
            clearInterval(timer);
            window.removeEventListener("mousewheel", handleWheel);
        };
    }, []);

    useEffect(() => {
        if (detectScroll.direction > 0) {
            scrollEvent(true);
        } else {
            if (currentPage > 0) scrollEvent(false);
        }
    }, [detectScroll]);

    return (
        <div className="Home" ref={targetRef}>
            <MainFrame
                page={currentPage}
            ></MainFrame>
        </div>
    );
};

export default HomeIndex;