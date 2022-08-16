import type { NextApiRequest, NextApiResponse } from 'next';
import sql from '../../../db/db';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method?.toUpperCase()) {
        case 'DELETE':
            deleteHandler(req, res);
            break;

        default:
            throw 'Method not handled';
    }
}

async function deleteHandler(req: NextApiRequest, res: NextApiResponse<any>) {
    const { post_id } = req.query;

    if (!post_id || typeof post_id !== 'string') {
        throw 'missing parameter id to delete post';
    }

    await sql`delete from posts where post_id = ${post_id}`;

    res.json({ post_id });
}
