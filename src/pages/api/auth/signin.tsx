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
        const { customId, password } = req.body;
        try {
            const user = await db.get('SELECT * FROM user WHERE customId = ?', [customId]);
            if (!user) {
                res.status(400).json({ message: 'Id does not exists' });
                return;
            }
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                res.status(400).json({ message: 'Password does not match' });
                return;
            }
            const token = jwt.sign({ customId: user.customId }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
            res.status(200).json({ message: 'success', token });
        } catch (e) {

        }
    } else {
        res.status(400).json({ message: 'Bad request' });
        return;
    }
}