import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt, { JwtPayload } from "jsonwebtoken";
import axios, { Method } from 'axios';
import { getApiUrl } from './utils/getApiUrl';

export async function middleware(request: NextRequest) {
    try {
        let token: string = request.cookies.get('token')?.value as string;
        if (!token) {
            token = request.headers.get('authorization') as string;
            if (token) token = token.split(" ")[1];
        }
        if (!token) {
            token = request.headers.get('authorization') as string;
            return request.nextUrl.pathname.startsWith('/api') ? new Response(JSON.stringify({ statusCode: 401, content: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } })
                : NextResponse.redirect(new URL('/auth/signin', request.url));
        }

        try {
            const response = await fetch(getApiUrl('/auth/role'), {
                method: 'get' as Method,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();

            if (data.statusCode == 200 || data.statusCode == '200') {
                const role = data.content;
                if (role < 2) {
                    return request.nextUrl.pathname.startsWith('/api') ? new Response(JSON.stringify({ statusCode: 401, content: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } })
                        : NextResponse.redirect(new URL('/auth/signin', request.url));
                }
            } else {
                return request.nextUrl.pathname.startsWith('/api') ? new Response(JSON.stringify({ statusCode: 401, content: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } })
                    : NextResponse.redirect(new URL('/auth/signin', request.url));
            }
        } catch (e) {
            return request.nextUrl.pathname.startsWith('/api') ? new Response(JSON.stringify({ statusCode: 401, content: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } })
                : NextResponse.redirect(new URL('/auth/signin', request.url));
        }
        return NextResponse.next();
    }
    catch (e) {
        return new Response(JSON.stringify({ statusCode: 500, content: 'Exception!' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

export const config = {
    matcher: ['/admin/:path*']
};