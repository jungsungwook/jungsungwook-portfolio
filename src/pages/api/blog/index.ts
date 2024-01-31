import { NextApiRequest, NextApiResponse } from "next";
import DbHandler from '@/database/dbHandler';
import { GetAuth } from "@/utils/getAuth";
import { Formidable } from "formidable";
import { GenerateRandomString } from "@/utils/generateRandomString";
import path from "path";
import fs from 'fs'
import { promisify } from 'util';
import { getApiUrl } from "@/utils/getApiUrl";
import { protectInjection } from "@/utils/protectInjection";
const writeFileAsync = promisify(fs.writeFile);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const db = await new DbHandler().getDatabase();
    if (req.method === 'GET') {
        let { search, page, limit, tag } = req.query;
        if(!protectInjection(search as string)) return res.status(401).json({ message: '비정상적인 검색어 입니다.' });
        if(!protectInjection(tag as string)) return res.status(401).json({ message: '비정상적인 태그 입니다.' });
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
        // const role = await GetAuth(req);
        // if (!role.isSuccess) res.status(401).json({ message: role.message });
        // if (role.message < 2) res.status(401).json({ message: role.message });

        const data: {
            fields: any;
            file: any;
        } = await new Promise((resolve, reject) => {
            const form = new Formidable();

            form.parse(req, (err, fields, file) => {
                if (err) reject({ err });
                resolve({ fields, file });
            });
        });
        let { content, subject, tags, image } = data.fields;
        content = content[0];
        subject = subject[0];
        tags = tags[0].split(",");

        let thumbnailImage = null;
        if (image) {
            const type = image[0].split(";base64")[0].split("/")[1];
            image = Buffer.from(image[0].split(";base64").pop(), 'base64');
            const uid = GenerateRandomString(11)
            const fileName = `${uid}.${type}`;
            const filePath = path.resolve(process.cwd(), 'uploads', fileName);
            await writeFileAsync(filePath, image);

            const result = await db.run(`
                INSERT INTO image (uid, originalName, saveName, url)
                    VALUES (?, ?, ?, ?)
            `   , uid
                , fileName.split(".")[0]
                , fileName
                , getApiUrl(`/admin/blog/image/${uid}`)
            )
            if (result.changes !== 1) {
                return res.status(500).json({ message: '썸네일 사진 저장 중 Error 발생.' });
            }
            thumbnailImage = getApiUrl(`/admin/blog/image/${uid}`);
        }
        const result = await db.run(`
            INSERT INTO blog (subject, content, thumbnail) 
                VALUES (?, ?, ?)
        `, subject, content, thumbnailImage);
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