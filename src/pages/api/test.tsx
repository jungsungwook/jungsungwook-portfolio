import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from "jsonwebtoken";
import DbHandler from '@/database/dbHandler';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const db = await new DbHandler().getDatabase();
    const result = await db.all('INSERT INTO user (name, email, password) VALUES (?, ?, ?)', ['test', 'test', 'test']);

    res.status(200).json({ name: 'John Doe' })
}