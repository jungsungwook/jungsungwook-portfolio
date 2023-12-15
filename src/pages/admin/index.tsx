import { useRecoilState } from "recoil";
import { isLoginState } from "@/states/is-login";
import { ParallaxProvider, useParallax } from "react-scroll-parallax";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import MainFrame from "@/components/main-frame";
import Head from "next/head";
import axios, { Method } from "axios";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";

const AdminIndex = () => {
    const router = useRouter();
    const token = getCookie('token');
    useEffect(() => {
        const res = axios({
            method: 'get' as Method,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            url: `/api/auth/role`,
        }).then((res) => {
            const result = res.data;
            if (result.statusCode == 200 || result.statusCode == '200') {
                const role = result.content;
                if(role < 2) {
                    alert('관리자 권한이 필요합니다.');
                    router.push('/home');
                }
            }
        }).catch((e) => {
            alert('로그인이 필요합니다.');
            router.push('/auth/signin');
        });
    }, []);
    return (
        <>
            <MainFrame
                page={0}
            ></MainFrame>
        </>
    );
};

export default AdminIndex;