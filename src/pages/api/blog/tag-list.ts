import { NextApiRequest, NextApiResponse } from "next";
import DbHandler from '@/database/dbHandler';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { tags } = await getTags();
    // res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
    res.status(200).json({
        "statusCode": 200,
        "content": tags
    });
}

const getTags = async () => {
    const db = await new DbHandler().getDatabase();
    const tags: Array<{
        tag: string,
        tagCount: number
    }> = await db.all(`
        SELECT tag, COUNT(blogId) as tagCount
        FROM BLOG_TAGS
        WHERE isDeleted = 0
        GROUP BY tag;
    `);
    return { tags };
}
