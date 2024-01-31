import type { NextApiRequest, NextApiResponse } from 'next'
import jwt, { JwtPayload } from "jsonwebtoken";
import DbHandler from '@/database/dbHandler';
import bcrypt from 'bcrypt';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    if (req.method == 'GET') {
        const db = await new DbHandler().getDatabase();
        let token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            token = req.cookies.token;
        }
        if (!token) {
            res.status(401).json({ statusCode: 401, content: 'Unauthorized' });
            return;
        }
        try {
            // 토큰을 통해 유저 정보를 가져온다.
            const decoded : JwtPayload = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
            const user = await db.get('SELECT * FROM user WHERE customId = ?', [decoded.customId]);
            if (!user) {
                res.status(403).json({ message: 'Id does not exists' });
                return;
            }
            return res.status(200).json({ statusCode: 200, content: user.role });
        } catch (e) {
            res.status(401).json({ statusCode: 401, content: 'Unauthorized' });
        }
    } else {
        res.status(400).json({ message: 'Bad request' });
        return;
    }
}