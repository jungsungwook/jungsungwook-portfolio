import { NextApiRequest, NextApiResponse } from "next";
import DbHandler from '@/database/dbHandler';
import fs from 'fs'
import { Formidable } from "formidable";
import { GetAuth } from "@/utils/getAuth";
import path from "path";
import { GenerateRandomString } from "@/utils/generateRandomString";
import { getApiUrl } from "@/utils/getApiUrl";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {

    const role = await GetAuth(req);
    if (!role.isSuccess) res.status(401).json({ message: role.message });
    if (role.message < 2) res.status(401).json({ message: role.message });
    const db = await new DbHandler().getDatabase();
    if (req.method === 'GET') {
        res.status(201).json({ message: 'Created' });
        return;
    } else if (req.method === 'POST') {
        try {
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
            const { file } = data.file;
            const uid = GenerateRandomString(10)
            const originalFileName = file[0].originalFilename.split(".")[0]
            const fileType = file[0].originalFilename.split(".")[1]
            const filePath = path.resolve(process.cwd(), 'uploads', originalFileName + "_" + uid + "." + fileType);

            fs.copyFileSync(file[0].filepath, filePath);

            const result = await db.run(`
                INSERT INTO image (uid, originalName, saveName, url)
                    VALUES (?, ?, ?, ?)
            `   , uid
                , originalFileName
                , originalFileName + "_" + uid + "." + fileType
                , getApiUrl(`/admin/blog/image/${uid}`)
            )
            if (result.changes !== 1) {
                return res.status(500).json({ message: 'Internal Server Error' });
            }

            res.status(201).json({ message: getApiUrl(`/admin/blog/image/${uid}`) });
            return
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: 'error' });
            return;
        }
    }
}