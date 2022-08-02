import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const alice = await prisma.user.upsert({
    where: { id: 1 },
    update: {},
    create: {
      email: 'alice@prisma.io',
      name: 'Alice',
      imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      posts: {
        create: {
          title: 'Check out Prisma with Next.js',
          content: "This is a super cool post, ain't it?",
        },
      },
    },
  });

  const bob = await prisma.user.upsert({
    where: { id: 2 },
    update: {},
    create: {
      email: 'bob@prisma.io',
      name: 'Bob',
      imageUrl:
        'https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      posts: {
        create: [
          {
            title: 'First Post, Please be nice',
            content: 'Hey my name is Bob. How are all you doing?',
          },
          {
            title: 'Follow Me on Twitter',
            content: 'Come checkout my hot takes and hot cakes on twitter.',
          },
        ],
      },
    },
  });

  const charlie = await prisma.user.upsert({
    where: { id: 3 },
    update: {},
    create: {
      imageUrl:
        'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      email: 'charlie@email.io',
      name: 'Charlie',
    },
  });

  console.log({ alice, bob, charlie });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
