import { NextApiRequest, NextApiResponse } from "next";
import DbHandler from '@/database/dbHandler';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { id } = req.query;
        const blog = await getBlogById(Number(id));
        if (!blog) {
            return res.status(404).json({ message: '404 Not Found' });
        }
        res.status(200).json({
            "statusCode": 200,
            "content": blog
        });
    } else if (req.method === 'POST') {
        const { subject, content } = req.body;
        const db = await new DbHandler().getDatabase();
        const result = await db.run(`
            INSERT INTO blog (subject, content) 
                VALUES (?, ?)
        `, subject, content);
        if (result.changes !== 1) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        res.status(201).json({ message: 'Created' });
    }
};

const getBlogById = async (id: number) => {
    const db = await new DbHandler().getDatabase();
    const blog = await db.get(`
        SELECT * 
            FROM blog
        WHERE 
            id = ? 
        AND
            isDeleted = 0
    `, id);
    return blog ? blog : null;
};