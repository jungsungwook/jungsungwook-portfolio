import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from "jsonwebtoken";
import DbHandler from '@/database/dbHandler';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        res.status(200).json({ statusCode:200, content: 'Authorized' });
    } catch (e) {
        res.status(401).json({ statusCode:200, content: 'Unauthorized' });
    }
}