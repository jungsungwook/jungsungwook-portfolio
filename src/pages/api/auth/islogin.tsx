import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from "jsonwebtoken";
import DbHandler from '@/database/dbHandler';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const db = await new DbHandler().getDatabase();
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        res.status(200).json({ message: 'Authorized' });
    } catch (e) {
        res.status(401).json({ message: 'Unauthorized' });
    }
}