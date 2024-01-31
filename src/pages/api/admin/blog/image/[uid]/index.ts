import { NextApiRequest, NextApiResponse } from "next";
import DbHandler from '@/database/dbHandler';
import path from "path";
import fs from 'fs'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { uid } = req.query;
        const image = await getImageById(uid as string);
        if (!image) {
            return res.status(404).json({ message: '404 Not Found' });
        }
        const filePath = path.join(process.cwd(), 'uploads', image.saveName);

        try {
            const fileStream = fs.createReadStream(filePath);
            fileStream.pipe(res);
        } catch (error) {
            res.status(404).json({ error: 'File not found' });
        }
    }
};

const getImageById = async (uid: string) => {
    const db = await new DbHandler().getDatabase();
    const img = await db.get(`
        SELECT * 
            FROM image
        WHERE 
            uid = ? 
        AND
            isDeleted = 0
    `, uid);
    return img ? img : null;
};