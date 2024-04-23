const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      username: 'user1',
      password: 'password1',
      posts: {
        create: [
          { title: 'Post 1', content: 'Content of Post 1' },
          { title: 'Post 2', content: 'Content of Post 2' },
          { title: 'Post 3', content: 'Content of Post 3' },
        ],
      },
    },
  });

  await prisma.user.create({
    data: {
      username: 'user2',
      password: 'password2',
      posts: {
        create: [
          { title: 'Post 4', content: 'Content of Post 4' },
          { title: 'Post 5', content: 'Content of Post 5' },
          { title: 'Post 6', content: 'Content of Post 6' },
        ],
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });