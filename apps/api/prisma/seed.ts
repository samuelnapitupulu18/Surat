import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 1. Departments
  const deptHR = await prisma.department.upsert({
    where: { name: 'HR' },
    update: {},
    create: { name: 'HR' },
  });
  
  const deptIT = await prisma.department.upsert({
    where: { name: 'IT' },
    update: {},
    create: { name: 'IT' },
  });

  // 2. Positions
  const posManager = await prisma.position.upsert({
    where: { name: 'Manager' },
    update: {},
    create: { name: 'Manager' },
  });

  const posStaff = await prisma.position.upsert({
    where: { name: 'Staff' },
    update: {},
    create: { name: 'Staff' },
  });

  // 3. Admin User
  const adminEmail = 'admin@example.com';
  const adminUser = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      password: 'hashedparams_placeholder_password', // In real app, hash this!
      role: 'ADMIN',
      departmentId: deptIT.id,
      positionId: posManager.id,
    },
  });

  // 4. Approval Flow
  const flowLeave = await prisma.approvalFlow.create({
    data: {
      name: 'Standard Leave Flow',
      steps: JSON.stringify(['Manager', 'HR']),
    }
  });

  // 5. Submission (Contoh Surat)
  await prisma.submission.create({
    data: {
      type: 'LEAVE',
      data: JSON.stringify({
        reason: 'Vacation',
        startDate: '2023-01-01',
        endDate: '2023-01-05',
      }),
      userId: adminUser.id,
      approvalFlowId: flowLeave.id,
      status: 'PENDING',
    }
  });

  console.log('Seeding finished.');
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
