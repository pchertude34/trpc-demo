import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../server/db/client';
import { AUTHOR_ID } from '../../../utils/constants';

interface PostByIdRequest extends NextApiRequest {
  query: {
    id: string;
  };
}

const postById = async (req: PostByIdRequest, res: NextApiResponse) => {
  const id = parseInt(req.query.id, 10);

  if (req.method === 'DELETE') {
    const post = await prisma.post.findUnique({ where: { id } });

    if (post?.authorId === AUTHOR_ID) {
      await prisma.post.delete({ where: { id } });
      return res.status(200).send('deleted');
    }

    return res.status(401).send('Unauthorized');
  }

  // return 404 for unallowed methods
  return res.status(404).send('Not Found');
};

export default postById;
