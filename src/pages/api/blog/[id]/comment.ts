import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from "jsonwebtoken";
import DbHandler from '@/database/dbHandler';
import { GetUser } from '@/utils/getAuth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    const db = await new DbHandler().getDatabase();
    if (req.method === 'GET') {
        const result = await db.all(`
            SELECT *
            FROM COMMENT
            WHERE blogId = ?
            AND isDeleted = 0
            ORDER BY id ASC
        `, id)
        res.status(201).json({
            "statusCode": 200,
            "content": result
        });
        return;
    } else if (req.method === 'POST') {
        const user = await GetUser(req);
        console.log(user);
        if (!user.isSuccess) return res.status(401).json({ message: '로그인 후 가능합니다.' });
        const { content, isReply, parentId } = req.body;
        if (!content) return res.status(403).json({ message: '댓글을 입력하세요.' });
        try {
            if (isReply) {
                if (!parentId) return res.status(403).json({ message: '잘못 된 요청입니다.' });
                const parent = await db.get(`
                    SELECT *
                    FROM COMMENT
                    WHERE id = ?
                    AND isDeleted = 0
                    ORDER BY id ASC
                `, parentId);
                if (!parent || parent.isReply) return res.status(403).json({ message: '잘못 된 요청입니다.' });
            }
            const result = await db.run(
                `
                    INSERT INTO COMMENT (blogId, content, isReply, parentId, createdBy)
                    VALUES (?, ?, ?, ?, ?)
                `, id, content, isReply == 1 ? isReply : 0, parentId ? parentId : null, user.message.customId
            )
            if (result.changes !== 1) {
                return res.status(500).json({ message: 'Internal Server Error' });
            }
            res.status(201).json({ message: 'Created' });
            return;
        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Internal Server Error' });
            return;
        }
    }
}