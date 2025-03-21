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
            media: {
              create: [
                {
                  url: 'https://example.com/luke_post1_media1.jpg',
                  type: 'image',
                  userId: 1, 
                },
                {
                  url: 'https://example.com/luke_post1_media2.jpg',
                  type: 'image',
                  userId: 1, 
                },
              ],
            },
          },
          {
            title: 'My New Lightsaber',
            content: 'Just built my new green lightsaber. It’s perfect for defending the galaxy!',
            media: {
              create: [
                {
                  url: 'https://example.com/luke_post2_media1.jpg',
                  type: 'image',
                  userId: 1, 
                },
              ],
            },
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
            media: {
              create: [
                {
                  url: 'https://example.com/leia_post1_media1.jpg',
                  type: 'image',
                  userId: 2, 
                },
              ],
            },
          },
          {
            title: 'Remember Alderaan',
            content: 'Today we honor those we lost. Alderaan will never be forgotten.',
            media: {
              create: [
                {
                  url: 'https://example.com/leia_post2_media1.jpg',
                  type: 'image',
                  userId: 2, 
                },
              ],
            },
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
            media: {
              create: [
                {
                  url: 'https://example.com/han_post1_media1.jpg',
                  type: 'image',
                  userId: 3, 
                },
              ],
            },
          },
          {
            title: 'Chewie’s New Bowcaster',
            content: 'Chewie got a new bowcaster. He’s unstoppable now!',
            media: {
              create: [
                {
                  url: 'https://example.com/han_post2_media1.jpg',
                  type: 'image',
                  userId: 3, 
                },
              ],
            },
          },
        ],
      },
    },
  });

  // Create additional users
  const yoda = await prisma.user.upsert({
    where: { email: 'yoda@jedi.com' },
    update: {},
    create: {
      username: 'master_yoda',
      email: 'yoda@jedi.com',
      password: 'wisdom123',
      name: 'Yoda',
      bio: 'Jedi Master. Wise and powerful.',
      profilePicture: 'https://example.com/yoda.jpg',
      posts: {
        create: [
          {
            title: 'The Path to Wisdom',
            content: 'Patience you must have, my young padawan.',
            media: {
              create: [
                {
                  url: 'https://example.com/yoda_post1_media1.jpg',
                  type: 'image',
                  userId: 4,
                },
              ],
            },
          },
        ],
      },
    },
  });

  const vader = await prisma.user.upsert({
    where: { email: 'vader@empire.com' },
    update: {},
    create: {
      username: 'darth_vader',
      email: 'vader@empire.com',
      password: 'dark456',
      name: 'Darth Vader',
      bio: 'Dark Lord of the Sith. Formerly Anakin Skywalker.',
      profilePicture: 'https://example.com/vader.jpg',
      posts: {
        create: [
          {
            title: 'The Power of the Dark Side',
            content: 'Join me, and together we can rule the galaxy as father and son.',
            media: {
              create: [
                {
                  url: 'https://example.com/vader_post1_media1.jpg',
                  type: 'image',
                  userId: 5, 
                },
              ],
            },
          },
        ],
      },
    },
  });

  // Fetch posts to use for comments and likes
  const posts = await prisma.post.findMany();
  const lukePost1 = posts[0]; // Luke's first post
  const leiaPost1 = posts[2]; // Leia's first post
  const hanPost1 = posts[4]; // Han's first post
  const yodaPost1 = posts[6]; // Yoda's first post
  const vaderPost1 = posts[7]; // Vader's first post

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

  await prisma.comment.create({
    data: {
      content: 'The Force is strong with this one.',
      post: { connect: { id: yodaPost1.id } },
      user: { connect: { id: luke.id } },
    },
  });

  await prisma.comment.create({
    data: {
      content: 'I find your lack of faith disturbing.',
      post: { connect: { id: vaderPost1.id } },
      user: { connect: { id: han.id } },
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

  await prisma.like.create({
    data: {
      post: { connect: { id: yodaPost1.id } },
      user: { connect: { id: luke.id } },
    },
  });

  await prisma.like.create({
    data: {
      post: { connect: { id: vaderPost1.id } },
      user: { connect: { id: han.id } },
    },
  });

  // Create followers and following relationships
  await prisma.user.update({
    where: { id: luke.id },
    data: {
      followers: {
        connect: [{ id: leia.id }, { id: han.id }, { id: yoda.id }],
      },
      following: {
        connect: [{ id: leia.id }, { id: han.id }, { id: yoda.id }],
      },
    },
  });

  await prisma.user.update({
    where: { id: leia.id },
    data: {
      followers: {
        connect: [{ id: luke.id }, { id: han.id }],
      },
      following: {
        connect: [{ id: luke.id }, { id: han.id }],
      },
    },
  });

  await prisma.user.update({
    where: { id: han.id },
    data: {
      followers: {
        connect: [{ id: luke.id }, { id: leia.id }],
      },
      following: {
        connect: [{ id: luke.id }, { id: leia.id }],
      },
    },
  });

  await prisma.user.update({
    where: { id: yoda.id },
    data: {
      followers: {
        connect: [{ id: luke.id }],
      },
      following: {
        connect: [{ id: luke.id }],
      },
    },
  });

  await prisma.user.update({
    where: { id: vader.id },
    data: {
      followers: {
        connect: [{ id: han.id }],
      },
      following: {
        connect: [{ id: han.id }],
      },
    },
  });

  console.log({ luke, leia, han, yoda, vader });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });