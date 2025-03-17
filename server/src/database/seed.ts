import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create three Star Wars users
  const luke = await prisma.user.upsert({
    where: { email: 'luke@jedi.com' },
    update: {},
    create: {
      username: 'luke_skywalker',
      email: 'luke@jedi.com',
      password: 'force123',
      name: 'Luke Skywalker',
      bio: 'Jedi Master. Farm boy at heart.',
      profilePicture: 'https://example.com/luke.jpg',
      posts: {
        create: [
          {
            title: 'The Force is Strong',
            content: 'I’ve been training with Master Yoda. The Force is more powerful than I ever imagined!',
            mediaType: 'image',
            mediaURL: 'https://example.com/force.jpg',
          },
          {
            title: 'My New Lightsaber',
            content: 'Just built my new green lightsaber. It’s perfect for defending the galaxy!',
            mediaType: 'video',
            mediaURL: 'https://example.com/lightsaber.mp4',
          },
        ],
      },
    },
  });

  const leia = await prisma.user.upsert({
    where: { email: 'leia@rebel.com' },
    update: {},
    create: {
      username: 'princess_leia',
      email: 'leia@rebel.com',
      password: 'hope456',
      name: 'Leia Organa',
      bio: 'Leader of the Rebel Alliance. General and Princess.',
      profilePicture: 'https://example.com/leia.jpg',
      posts: {
        create: [
          {
            title: 'Rebel Alliance Update',
            content: 'The fight against the Empire continues. We need all the help we can get!',
            mediaType: 'image',
            mediaURL: 'https://example.com/rebel.jpg',
          },
          {
            title: 'Remember Alderaan',
            content: 'Today we honor those we lost. Alderaan will never be forgotten.',
            mediaType: 'video',
            mediaURL: 'https://example.com/alderaan.mp4',
          },
        ],
      },
    },
  });

  const han = await prisma.user.upsert({
    where: { email: 'han@falcon.com' },
    update: {},
    create: {
      username: 'han_solo',
      email: 'han@falcon.com',
      password: 'kessel789',
      name: 'Han Solo',
      bio: 'Smuggler, Scoundrel, and Captain of the Millennium Falcon.',
      profilePicture: 'https://example.com/han.jpg',
      posts: {
        create: [
          {
            title: 'Kessel Run Record',
            content: 'Just made the Kessel Run in less than 12 parsecs. Beat that!',
            mediaType: 'image',
            mediaURL: 'https://example.com/kessel.jpg',
          },
          {
            title: 'Chewie’s New Bowcaster',
            content: 'Chewie got a new bowcaster. He’s unstoppable now!',
            mediaType: 'video',
            mediaURL: 'https://example.com/chewie.mp4',
          },
        ],
      },
    },
  });

  // Fetch posts to use for comments and likes
  const posts = await prisma.post.findMany();
  const lukePost1 = posts[0]; // Luke's first post
  const leiaPost1 = posts[2]; // Leia's first post

  // Create comments
  await prisma.comment.create({
    data: {
      content: 'May the Force be with you, Luke!',
      post: { connect: { id: lukePost1.id } },
      user: { connect: { id: leia.id } },
    },
  });

  await prisma.comment.create({
    data: {
      content: 'Nice work, kid. But don’t get cocky!',
      post: { connect: { id: lukePost1.id } },
      user: { connect: { id: han.id } },
    },
  });

  await prisma.comment.create({
    data: {
      content: 'We’re with you, Leia. For Alderaan!',
      post: { connect: { id: leiaPost1.id } },
      user: { connect: { id: luke.id } },
    },
  });

  // Create likes
  await prisma.like.create({
    data: {
      post: { connect: { id: lukePost1.id } },
      user: { connect: { id: leia.id } },
    },
  });

  await prisma.like.create({
    data: {
      post: { connect: { id: lukePost1.id } },
      user: { connect: { id: han.id } },
    },
  });

  await prisma.like.create({
    data: {
      post: { connect: { id: leiaPost1.id } },
      user: { connect: { id: luke.id } },
    },
  });

  console.log({ luke, leia, han });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });