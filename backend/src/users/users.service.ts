import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: {
  username: string;
  email: string;
  passwordHash: string;
}) {
  console.log('REGISTER START');

  const user = await this.prisma.user.create({
    data: {
      username: data.username,
      email: data.email,
      passwordHash: data.passwordHash,
      profile: {
        create: {
          displayName: data.username,
        },
      },
    },
    include: {
      profile: true,
    },
  });

  console.log(user);

  return user;
}

async findByUsername(username: string) {
  return this.prisma.user.findUnique({
    where: { username },
  });
}
  async getProfile(userId: string) {
  return this.prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      username: true,
      email: true,
      isAdmin: true,
      isVerified: true,
      createdAt: true,
    },
  });
}

  async findByEmail(email: string) {
  return this.prisma.user.findUnique({
    where: {
      email,
    },
  });
}
}