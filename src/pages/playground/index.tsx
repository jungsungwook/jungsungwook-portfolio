import { isLoginState } from "@/states/is-login";
import axios, { Method } from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

const PlayGroundIndex = () => {
    const [isLogin, setIsLoginState] = useRecoilState(isLoginState);
    const [user, setUser] = useState(Object);
    useEffect(() => {
        const isLogin = axios({
            method: 'get' as Method,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
            url: `/api/auth/islogin`,
        }).then((res) => {
            const result = res.data;
            if (result.statusCode == 200 || result.statusCode == '200') {
                setUser({
                    id: result.contents.id,
                    email: result.contents.email,
                    name: result.contents.name,
                    customId: result.contents.customId,
                });
                localStorage.setItem('isLogin', 'true');
                setIsLoginState(true);
            } else {
                localStorage.setItem('isLogin', 'false');
                setIsLoginState(false);
                setUser({});
            }
        }).catch((res) => {
            localStorage.setItem('isLogin', 'false');
            setIsLoginState(false);
            setUser({});
        });
    },[]);

}

export default PlayGroundIndex;