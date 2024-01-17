import { NextApiRequest, NextApiResponse } from "next";
import DbHandler from '@/database/dbHandler';
import jwt from "jsonwebtoken";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const realIp = req.headers['x-real-ip'];
    // res.status(200).json({
    //     "statusCode": 200,
    //     "content": realIp
    // });
    const db = await new DbHandler().getDatabase();
    if (req.method === 'GET') {
        const books = await db.all(`
            SELECT *
                FROM blog_guestbook_log
            WHERE
                isDeleted = 0
            ORDER BY createdAt DESC
        `);
        res.status(200).json({
            "statusCode": 200,
            "content": books
        });
    } else if (req.method === 'POST') {
        const { contents } = req.body;
        let token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            token = req.cookies.token;
        }
        if (!token) {
            const timeCheck = await db.get(`
                SELECT createdAt
                FROM blog_guestbook_log
                WHERE isDeleted = 0
                AND
                ip='${realIp}'
                ORDER BY createdAt DESC
            `);

            if (timeCheck) {
                const lastDateTime: any = new Date(timeCheck.createdAt);
                const currentDate: any = new Date();

                const oneHourPassed = (currentDate - lastDateTime) >= (1 * 60 * 60 * 1000);
                if (!oneHourPassed) res.status(403).json({ statusCode: 403, content: "방명록은 하루에 한 번 작성할 수 있습니다." });
            }

            const result = await db.run(`
                INSERT INTO blog_guestbook_log (ip,contents)
                VALUES (?, ?)
            `, req.headers['x-real-ip'], contents);
            res.status(201).json({ statusCode: 201, content: "Guest" });
        } else {
            try {
                const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
                const userId = decoded.customId;
                const result = await db.run(`
                    INSERT INTO blog_guestbook_log (userId,ip,contents)
                    VALUES (?, ?, ?)
                `, userId, realIp, contents);
                res.status(201).json({ statusCode: 201, content: "User" });
            } catch (e) {
                const result = await db.run(`
                    INSERT INTO blog_guestbook_log (ip,contents)
                    VALUES (?, ?)
                `, realIp, contents);
                res.status(201).json({ statusCode: 201, content: "Guest" });
            }
        }
    }
};