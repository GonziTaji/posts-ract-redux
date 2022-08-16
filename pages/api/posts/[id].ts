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
    const { id } = req.query;

    if (!id) throw 'missing parameter id to delete post';

    const deleteResponse = await sql`
        delete from posts where id = ${id}
    `;

    res.json({ response: deleteResponse[0] });
}
