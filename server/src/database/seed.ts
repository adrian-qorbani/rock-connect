import { PrismaClient } from '@prisma/client';
import * as path from 'path';
import * as fs from 'fs';

const prisma = new PrismaClient();

// Directory where profile pictures will be stored locally
const profilePicturesDir = path.join(__dirname, '..', 'public', 'profiles');

// Ensure directory exists
if (!fs.existsSync(profilePicturesDir)) {
  fs.mkdirSync(profilePicturesDir, { recursive: true });
}

async function main() {
  // Clear existing data
  await prisma.like.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  // Create users with profile pictures and posts
  const freddie = await prisma.user.create({
    data: {
      username: 'freddie_mercury',
      email: 'freddie@queen.com',
      password: 'bohemian123',
      name: 'Freddie Mercury',
      bio: 'Lead vocalist of Queen. Show must go on!',
      profilePicture: 'http://localhost:3000/profiles/freddie.jpg',
      posts: {
        create: [
          {
            title: 'New Album Coming Soon',
            content:
              "Working on some amazing new tracks with the band. Can't wait to share them with you all!",
          },
          {
            title: 'Live Aid Memories',
            content:
              'One of the greatest performances of my life. The energy from the crowd was electrifying!',
          },
        ],
      },
    },
  });

  const david = await prisma.user.create({
    data: {
      username: 'david_bowie',
      email: 'david@bowiemail.com',
      password: 'ziggy456',
      name: 'David Bowie',
      bio: 'Musician, actor, and icon. The chameleon of rock.',
      profilePicture: 'http://localhost:3000/profiles/david.jpg',
      posts: {
        create: [
          {
            title: 'New Persona: Ziggy Stardust',
            content:
              "Introducing my new alter ego. He's a space oddity like no other!",
          },
          {
            title: 'Berlin Trilogy Complete',
            content:
              'Just finished recording with Brian Eno. This is some of my most experimental work yet.',
          },
        ],
      },
    },
  });

  const stevie = await prisma.user.create({
    data: {
      username: 'stevie_nicks',
      email: 'stevie@fleetwood.com',
      password: 'rhiannon789',
      name: 'Stevie Nicks',
      bio: 'Singer-songwriter. The mystical queen of rock.',
      profilePicture: 'http://localhost:3000/profiles/stevie.jpg',
      posts: {
        create: [
          {
            title: 'New Solo Album',
            content:
              'Working on my next solo project while still touring with Fleetwood Mac. So excited!',
          },
          {
            title: 'Remembering Christine',
            content:
              'My dear friend and bandmate. The music will never be the same without you.',
          },
        ],
      },
    },
  });

  const jimmy = await prisma.user.create({
    data: {
      username: 'jimmy_page',
      email: 'jimmy@zeppelin.com',
      password: 'stairway123',
      name: 'Jimmy Page',
      bio: 'Guitarist and producer. Led Zeppelin forever.',
      profilePicture: 'http://localhost:3000/profiles/jimmy.jpg',
      posts: {
        create: [
          {
            title: 'Reunion Show?',
            content:
              'Thinking about getting the band together for one more show. Who would come?',
          },
        ],
      },
    },
  });

  const janis = await prisma.user.create({
    data: {
      username: 'janis_joplin',
      email: 'janis@pearl.com',
      password: 'pieceofmyheart456',
      name: 'Janis Joplin',
      bio: 'Blues-rock singer with a voice like no other.',
      profilePicture: 'http://localhost:3000/profiles/janis.jpg',
      posts: {
        create: [
          {
            title: 'Woodstock Experience',
            content:
              'The energy at this festival is unbelievable. The crowd, the music, the love!',
          },
        ],
      },
    },
  });

  // Create social connections
  await prisma.user.update({
    where: { id: freddie.id },
    data: {
      followers: {
        connect: [{ id: david.id }, { id: stevie.id }, { id: jimmy.id }],
      },
      following: {
        connect: [{ id: david.id }, { id: stevie.id }],
      },
    },
  });

  await prisma.user.update({
    where: { id: david.id },
    data: {
      followers: {
        connect: [{ id: freddie.id }, { id: stevie.id }],
      },
      following: {
        connect: [{ id: freddie.id }, { id: janis.id }],
      },
    },
  });

  await prisma.user.update({
    where: { id: stevie.id },
    data: {
      followers: {
        connect: [{ id: freddie.id }, { id: david.id }, { id: janis.id }],
      },
      following: {
        connect: [{ id: freddie.id }, { id: david.id }],
      },
    },
  });

  await prisma.user.update({
    where: { id: jimmy.id },
    data: {
      followers: {
        connect: [{ id: freddie.id }],
      },
      following: {
        connect: [{ id: freddie.id }, { id: janis.id }],
      },
    },
  });

  await prisma.user.update({
    where: { id: janis.id },
    data: {
      followers: {
        connect: [{ id: stevie.id }, { id: david.id }],
      },
      following: {
        connect: [{ id: stevie.id }],
      },
    },
  });

  // Create interactions
  const posts = await prisma.post.findMany();

  await prisma.comment.createMany({
    data: [
      {
        content: "Can't wait to hear the new material, Freddie!",
        postId: posts[0].id,
        userId: david.id,
      },
      {
        content: 'You always push boundaries, looking forward to it!',
        postId: posts[0].id,
        userId: stevie.id,
      },
      {
        content: 'Ziggy is such an incredible character!',
        postId: posts[2].id,
        userId: freddie.id,
      },
    ],
  });

  await prisma.like.createMany({
    data: [
      { postId: posts[0].id, userId: david.id },
      { postId: posts[0].id, userId: stevie.id },
      { postId: posts[2].id, userId: freddie.id },
      { postId: posts[4].id, userId: david.id },
    ],
  });

  console.log('Database seeded with rock musicians successfully!');
  console.log('Created users:', { freddie, david, stevie, jimmy, janis });
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });