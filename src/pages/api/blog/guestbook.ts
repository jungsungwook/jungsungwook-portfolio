import { NextApiRequest, NextApiResponse } from "next";
import DbHandler from '@/database/dbHandler';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const realIp = req.headers['x-real-ip'];

    res.status(200).json({
        "statusCode": 200,
        "content": realIp
    });
}