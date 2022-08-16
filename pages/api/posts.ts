import type { NextApiRequest, NextApiResponse } from 'next';
import sql from '../../db/db';
import { Post } from '../../interfaces';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method?.toUpperCase()) {
        case 'GET':
            getHandler(req, res);
            break;

        case 'POST':
            postHandler(req, res);
            break;

        default:
            throw 'Method not handled';
    }
}

async function postHandler(req: NextApiRequest, res: NextApiResponse<any>) {
    const formData = req.body;

    const insertResponse = await sql`
        insert into posts (name, description) values (
            ${formData.name},
            ${formData.description}
        )

        RETURNING post_id
    `;

    res.json({ response: insertResponse[0] });
}

async function getHandler(
    req: NextApiRequest,
    res: NextApiResponse<{ posts: Post[] }>
) {
    const list = await sql`
        select * from posts
    `;

    console.log(list);

    res.json({ posts: list as any });
}
