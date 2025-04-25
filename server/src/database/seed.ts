import { PrismaClient, MediaType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.like.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.media.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  // Create users with profile pictures and posts
  const luke = await prisma.user.create({
    data: {
      username: 'luke_skywalker',
      email: 'luke@jedi.com',
      password: 'force123',
      name: 'Luke Skywalker',
      bio: 'Jedi Master. Farm boy at heart.',
      profilePicture: 'https://example.com/luke.jpg',
      media: {
        create: [
          {
            url: 'https://example.com/luke_profile.jpg',
            type: MediaType.PROFILE_PICTURE,
          }
        ]
      },
      posts: {
        create: [
          {
            title: 'The Force is Strong',
            content: 'I\'ve been training with Master Yoda. The Force is more powerful than I ever imagined!',
            media: {
              create: [
                {
                  url: 'https://example.com/luke_post1_media1.jpg',
                  type: MediaType.POST_PICTURE,
                  userId: 1,
                },
                {
                  url: 'https://example.com/luke_post1_media2.jpg',
                  type: MediaType.POST_PICTURE,
                  userId: 1,
                },
              ],
            },
          },
          {
            title: 'My New Lightsaber',
            content: 'Just built my new green lightsaber. It\'s perfect for defending the galaxy!',
            media: {
              create: [
                {
                  url: 'https://example.com/luke_post2_media1.jpg',
                  type: MediaType.POST_PICTURE,
                  userId: 1,
                },
              ],
            },
          },
        ],
      },
    },
    include: {
      media: true,
      posts: {
        include: {
          media: true
        }
      }
    }
  });

  const leia = await prisma.user.create({
    data: {
      username: 'princess_leia',
      email: 'leia@rebel.com',
      password: 'hope456',
      name: 'Leia Organa',
      bio: 'Leader of the Rebel Alliance. General and Princess.',
      profilePicture: 'https://example.com/leia.jpg',
      media: {
        create: [
          {
            url: 'https://example.com/leia_profile.jpg',
            type: MediaType.PROFILE_PICTURE,
          }
        ]
      },
      posts: {
        create: [
          {
            title: 'Rebel Alliance Update',
            content: 'The fight against the Empire continues. We need all the help we can get!',
            media: {
              create: [
                {
                  url: 'https://example.com/leia_post1_media1.jpg',
                  type: MediaType.POST_PICTURE,
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
                  type: MediaType.POST_PICTURE,
                  userId: 2,
                },
              ],
            },
          },
        ],
      },
    },
    include: {
      media: true,
      posts: {
        include: {
          media: true
        }
      }
    }
  });

  const han = await prisma.user.create({
    data: {
      username: 'han_solo',
      email: 'han@falcon.com',
      password: 'kessel789',
      name: 'Han Solo',
      bio: 'Smuggler, Scoundrel, and Captain of the Millennium Falcon.',
      profilePicture: 'https://example.com/han.jpg',
      media: {
        create: [
          {
            url: 'https://example.com/han_profile.jpg',
            type: MediaType.PROFILE_PICTURE,
          }
        ]
      },
      posts: {
        create: [
          {
            title: 'Kessel Run Record',
            content: 'Just made the Kessel Run in less than 12 parsecs. Beat that!',
            media: {
              create: [
                {
                  url: 'https://example.com/han_post1_media1.jpg',
                  type: MediaType.POST_PICTURE,
                  userId: 3,
                },
              ],
            },
          },
          {
            title: 'Chewie\'s New Bowcaster',
            content: 'Chewie got a new bowcaster. He\'s unstoppable now!',
            media: {
              create: [
                {
                  url: 'https://example.com/han_post2_media1.jpg',
                  type: MediaType.POST_PICTURE,
                  userId: 3,
                },
              ],
            },
          },
        ],
      },
    },
    include: {
      media: true,
      posts: {
        include: {
          media: true
        }
      }
    }
  });

  // Create additional users
  const yoda = await prisma.user.create({
    data: {
      username: 'master_yoda',
      email: 'yoda@jedi.com',
      password: 'wisdom123',
      name: 'Yoda',
      bio: 'Jedi Master. Wise and powerful.',
      profilePicture: 'https://example.com/yoda.jpg',
      media: {
        create: [
          {
            url: 'https://example.com/yoda_profile.jpg',
            type: MediaType.PROFILE_PICTURE,
          }
        ]
      },
      posts: {
        create: [
          {
            title: 'The Path to Wisdom',
            content: 'Patience you must have, my young padawan.',
            media: {
              create: [
                {
                  url: 'https://example.com/yoda_post1_media1.jpg',
                  type: MediaType.POST_PICTURE,
                  userId: 4,
                },
              ],
            },
          },
        ],
      },
    },
    include: {
      media: true,
      posts: {
        include: {
          media: true
        }
      }
    }
  });

  const vader = await prisma.user.create({
    data: {
      username: 'darth_vader',
      email: 'vader@empire.com',
      password: 'dark456',
      name: 'Darth Vader',
      bio: 'Dark Lord of the Sith. Formerly Anakin Skywalker.',
      profilePicture: 'https://example.com/vader.jpg',
      media: {
        create: [
          {
            url: 'https://example.com/vader_profile.jpg',
            type: MediaType.PROFILE_PICTURE,
          }
        ]
      },
      posts: {
        create: [
          {
            title: 'The Power of the Dark Side',
            content: 'Join me, and together we can rule the galaxy as father and son.',
            media: {
              create: [
                {
                  url: 'https://example.com/vader_post1_media1.jpg',
                  type: MediaType.POST_PICTURE,
                  userId: 5,
                },
              ],
            },
          },
        ],
      },
    },
    include: {
      media: true,
      posts: {
        include: {
          media: true
        }
      }
    }
  });

  // Create social connections
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

  // Create interactions
  const posts = await prisma.post.findMany({
    include: {
      media: true
    }
  });

  await prisma.comment.createMany({
    data: [
      {
        content: 'May the Force be with you, Luke!',
        postId: posts[0].id,
        userId: leia.id,
      },
      {
        content: 'Nice work, kid. But don\'t get cocky!',
        postId: posts[0].id,
        userId: han.id,
      },
      {
        content: 'We\'re with you, Leia. For Alderaan!',
        postId: posts[2].id,
        userId: luke.id,
      },
      {
        content: 'The Force is strong with this one.',
        postId: posts[6].id,
        userId: luke.id,
      },
      {
        content: 'I find your lack of faith disturbing.',
        postId: posts[7].id,
        userId: han.id,
      },
    ],
  });

  await prisma.like.createMany({
    data: [
      { postId: posts[0].id, userId: leia.id },
      { postId: posts[0].id, userId: han.id },
      { postId: posts[2].id, userId: luke.id },
      { postId: posts[6].id, userId: luke.id },
      { postId: posts[7].id, userId: han.id },
    ],
  });

  console.log('Database seeded successfully!');
  console.log('Created users:', { luke, leia, han, yoda, vader });
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });