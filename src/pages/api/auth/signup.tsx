import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from "jsonwebtoken";
import DbHandler from '@/database/dbHandler';
import bcrypt from 'bcrypt';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    if (req.method == 'POST') {
        const db = await new DbHandler().getDatabase();
        const { customId, email, password, name } = req.body;
        try {
            const idCheck = await db.get('SELECT * FROM user WHERE customId = ?', [customId]);
            if (idCheck) {
                res.status(400).json({ message: 'Id already exists' });
                return;
            }
            const emailCheck = await db.get('SELECT * FROM user WHERE email = ?', [email]);
            if (emailCheck) {
                res.status(400).json({ message: 'Email already exists' });
                return;
            }
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);

            const result = await db.run('INSERT INTO user (customId, email, password, name) VALUES (?, ?, ?, ?)', [customId, email, hashedPassword, name]);
            return res.status(200).json({ message: 'success' });
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        res.status(400).json({ message: 'Bad request' });
        return;
    }
}