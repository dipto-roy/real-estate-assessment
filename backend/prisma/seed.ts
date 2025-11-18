import { PrismaClient, UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create users
  const hashedPassword = await bcrypt.hash('password123', 10);

  const buyer = await prisma.user.upsert({
    where: { email: 'buyer@example.com' },
    update: {},
    create: {
      name: 'John Buyer',
      email: 'buyer@example.com',
      password: hashedPassword,
      role: UserRole.buyer,
    },
  });

  const seller = await prisma.user.upsert({
    where: { email: 'seller@example.com' },
    update: {},
    create: {
      name: 'Jane Seller',
      email: 'seller@example.com',
      password: hashedPassword,
      role: UserRole.seller,
    },
  });

  const realtor = await prisma.user.upsert({
    where: { email: 'realtor@example.com' },
    update: {},
    create: {
      name: 'Bob Realtor',
      email: 'realtor@example.com',
      password: hashedPassword,
      role: UserRole.realtor,
    },
  });

  console.log('✓ Created users:', { buyer, seller, realtor });

  // Create projects
  const project1 = await prisma.project.create({
    data: {
      name: 'Downtown Luxury Condo',
      description: 'Beautiful 2BR condo in the heart of downtown with stunning city views',
      createdById: realtor.id,
    },
  });

  const project2 = await prisma.project.create({
    data: {
      name: 'Suburban Family Home',
      description: '4BR house with large backyard, perfect for families',
      createdById: realtor.id,
    },
  });

  const project3 = await prisma.project.create({
    data: {
      name: 'Beachfront Villa',
      description: 'Exclusive villa with private beach access',
      createdById: seller.id,
    },
  });

  console.log('✓ Created projects:', { project1, project2, project3 });

  // Create transactions
  const transaction1 = await prisma.transaction.create({
    data: {
      projectId: project1.id,
      buyerId: buyer.id,
      sellerId: seller.id,
      amount: 450000,
      timestamp: new Date('2024-01-15'),
    },
  });

  const transaction2 = await prisma.transaction.create({
    data: {
      projectId: project1.id,
      buyerId: buyer.id,
      sellerId: seller.id,
      amount: 25000,
      timestamp: new Date('2024-02-01'),
    },
  });

  const transaction3 = await prisma.transaction.create({
    data: {
      projectId: project2.id,
      buyerId: buyer.id,
      sellerId: seller.id,
      amount: 650000,
      timestamp: new Date('2024-02-10'),
    },
  });

  console.log('✓ Created transactions:', { transaction1, transaction2, transaction3 });

  // Create group chats
  const chat1 = await prisma.groupChat.create({
    data: {
      projectId: project1.id,
    },
  });

  const chat2 = await prisma.groupChat.create({
    data: {
      projectId: project2.id,
    },
  });

  console.log('✓ Created group chats:', { chat1, chat2 });

  // Add users to chats
  await prisma.groupChatUser.createMany({
    data: [
      { chatId: chat1.id, userId: buyer.id },
      { chatId: chat1.id, userId: seller.id },
      { chatId: chat1.id, userId: realtor.id },
      { chatId: chat2.id, userId: buyer.id },
      { chatId: chat2.id, userId: realtor.id },
    ],
  });

  console.log('✓ Added users to chats');

  // Create messages
  await prisma.message.createMany({
    data: [
      {
        chatId: chat1.id,
        senderId: realtor.id,
        content: 'Welcome to the Downtown Luxury Condo chat!',
        timestamp: new Date('2024-01-10T10:00:00Z'),
      },
      {
        chatId: chat1.id,
        senderId: buyer.id,
        content: 'Hi! I\'m very interested in this property.',
        timestamp: new Date('2024-01-10T10:05:00Z'),
      },
      {
        chatId: chat1.id,
        senderId: seller.id,
        content: 'Great to hear! Would you like to schedule a viewing?',
        timestamp: new Date('2024-01-10T10:10:00Z'),
      },
      {
        chatId: chat2.id,
        senderId: realtor.id,
        content: 'This family home has everything you need!',
        timestamp: new Date('2024-02-05T14:00:00Z'),
      },
      {
        chatId: chat2.id,
        senderId: buyer.id,
        content: 'The backyard looks amazing!',
        timestamp: new Date('2024-02-05T14:15:00Z'),
      },
    ],
  });

  console.log('✓ Created messages');

  console.log('');
  console.log('🎉 Seeding completed successfully!');
  console.log('');
  console.log('Test credentials:');
  console.log('  Buyer:   buyer@example.com / password123');
  console.log('  Seller:  seller@example.com / password123');
  console.log('  Realtor: realtor@example.com / password123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
