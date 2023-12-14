import { NextApiRequest, NextApiResponse } from "next";
import DbHandler from '@/database/dbHandler';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const db = await new DbHandler().getDatabase();
    if (req.method === 'GET') {
        let { search, page, limit, tag } = req.query;
        if (!page) page = '1';
        if (!limit) limit = '10';
        const blog = await db.all(`
            SELECT * 
                FROM blog 
            WHERE 
                isDeleted = 0
            ${search ? `AND subject LIKE '%${search}%'` : ''}
            ${tag ? `AND id IN (SELECT blogId FROM BLOG_TAGS WHERE tag = '${tag}')` : ''}
            ORDER BY id DESC
            LIMIT ${limit} OFFSET ${(Number(page) - 1) * Number(limit)};
        `);
        const blogWithTag = await Promise.all(blog.map(async (item) => {
            const tags = await db.all(`
                SELECT *
                    FROM BLOG_TAGS
                WHERE
                    blogId = ?
                ANd
                    isDeleted = 0
            `, item.id);
            return {
                ...item,
                tags: tags.map((tag) => tag.tag)
            };
        }));
        res.status(200).json({
            "statusCode": 200,
            "content": blogWithTag
        });
    } else if (req.method === 'POST') {
        const { subject, content, tags } = req.body;
        const result = await db.run(`
            INSERT INTO blog (subject, content) 
                VALUES (?, ?)
        `, subject, content);
        if (result.changes !== 1) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        for (const tag of tags) {
            await db.run(`
                INSERT INTO BLOG_TAGS (blogId, tag) 
                    VALUES (?, ?)
            `, result.lastID, tag);
        }
        res.status(201).json({ message: 'Created' });
    }
};