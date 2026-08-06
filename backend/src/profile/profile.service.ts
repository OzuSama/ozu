import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async getMe(userId: string) {
    return this.prisma.profile.findUnique({
      where: {
        userId,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
            isAdmin: true,
            isVerified: true,
          },
        },
      },
    });
  }

  async updateMe(
  userId: string,
  dto: {
    displayName?: string;
    avatarUrl?: string;
    profileBackgroundUrl?: string;
    commentBackgroundUrl?: string;
  },
) {
  return this.prisma.profile.update({
    where: {
      userId,
    },
    data: dto,
    include: {
      user: {
        select: {
          id: true,
          username: true,
          email: true,
          isAdmin: true,
          isVerified: true,
        },
      },
    },
  });
}
}