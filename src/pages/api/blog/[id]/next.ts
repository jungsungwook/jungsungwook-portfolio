import { NextApiRequest, NextApiResponse } from "next";
import DbHandler from '@/database/dbHandler';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { id } = req.query;
        const db = await new DbHandler().getDatabase();
        const result = await db.all(`
            SELECT id, subject
            FROM BLOG
            WHERE id > ?
            AND isDeleted = 0
            ORDER BY id ASC
        `, id);

        res.status(200).json({
            "statusCode": 200,
            "content": {
                count: result.length,
                id: result.length ? result[0].id : null,
                subject: result.length ? result[0].subject : null
            }
        });
    }
};