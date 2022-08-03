import { createRouter } from './context';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { AUTHOR_ID } from '../../utils/constants';

export const postRouter = createRouter()
  .query('all', {
    async resolve({ ctx }) {
      const posts = await ctx.prisma.post.findMany({
        include: {
          author: true,
        },
      });

      return posts;
    },
  })
  .mutation('create', {
    input: z.object({
      title: z.string().min(1),
      content: z.string().min(1),
      authorId: z.number(),
    }),
    async resolve({ input, ctx }) {
      const post = await ctx.prisma.post.create({
        data: {
          title: input.title,
          content: input.content,
          author: {
            connect: { id: input.authorId },
          },
        },
      });

      return post;
    },
  })
  .mutation('delete', {
    input: z.object({
      id: z.number(),
    }),
    async resolve({ input, ctx }) {
      const post = await ctx.prisma.post.findUnique({ where: { id: input.id } });

      if (post?.authorId === AUTHOR_ID) {
        await ctx.prisma.post.delete({ where: { id: input.id } });
        return null;
      }

      return new TRPCError({
        code: 'UNAUTHORIZED',
      });
    },
  });
