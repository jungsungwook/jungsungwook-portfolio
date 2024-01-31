import { NextApiRequest } from "next";
import jwt, { JwtPayload } from "jsonwebtoken";

export const GetAuth = async (req: NextApiRequest): Promise<{
    isSuccess: boolean,
    message: any
}> => {
    let token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        token = req.cookies.token;
    }
    if (!token) {
        return {
            isSuccess: false,
            message: "no token"
        };
    }
    try {
        // 토큰을 통해 유저 정보를 가져온다.
        const decoded: JwtPayload = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        return {
            isSuccess: true,
            message: decoded.role
        };
    } catch (e) {
        return {
            isSuccess: false,
            message: e
        };
    }
}

export const GetUser = async (req: NextApiRequest): Promise<{
    isSuccess: boolean,
    message: any
}> => {
    let token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        token = req.cookies.token;
    }
    if (!token) {
        return {
            isSuccess: false,
            message: "no token"
        };
    }
    try {
        // 토큰을 통해 유저 정보를 가져온다.
        const decoded: JwtPayload = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        return {
            isSuccess: true,
            message: decoded
        };
    } catch (e) {
        return {
            isSuccess: false,
            message: e
        };
    }
}

export const GetAuthWithToken = (_token: string): {
    isSuccess: boolean,
    message: any
} => {
    const token = _token;
    if (!token) {
        return {
            isSuccess: false,
            message: "no token"
        };
    }
    try {
        // 토큰을 통해 유저 정보를 가져온다.
        const decoded: JwtPayload = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        return {
            isSuccess: true,
            message: decoded.role
        };
    } catch (e) {
        return {
            isSuccess: false,
            message: e
        };
    }
}