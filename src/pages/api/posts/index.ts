// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../server/db/client';

export type AuthorType = {
  id: number;
  email: string;
  name: string;
  imageUrl: string;
  posts: PostType[];
};

export type PostType = {
  id: number;
  title: string;
  content: string;
  author: AuthorType;
};

interface PostApiRequest extends NextApiRequest {
  body: {
    title?: string;
    content?: string;
    authorId?: number;
  };
}

const posts = async (req: PostApiRequest, res: NextApiResponse) => {
  const { title, content, authorId } = req.body;
  if (req.method === 'GET') {
    const posts = await prisma.post.findMany({
      include: {
        author: true,
      },
    });

    res.status(200).json(posts);
  } else if (req.method === 'POST') {
    if (title && content && authorId) {
      const createdPost = await prisma.post.create({
        data: {
          title,
          content,
          author: {
            connect: { id: authorId },
          },
        },
      });

      return res.status(200).json(createdPost);
    } else {
      return res.status(400);
    }
  }
};

export default posts;
