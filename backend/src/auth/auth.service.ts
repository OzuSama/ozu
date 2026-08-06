import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { RegisterUserDto } from './dto/register-user.dto';
import { UsersService } from '../users/users.service';
import { BadRequestException } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
  private readonly usersService: UsersService,
  private readonly jwtService: JwtService,
) {}

  async register(dto: RegisterUserDto) {
  const existingUsername = await this.usersService.findByUsername(dto.username);

  if (existingUsername) {
    throw new BadRequestException('Username already exists');
  }

  const existingEmail = await this.usersService.findByEmail(dto.email);

  if (existingEmail) {
    throw new BadRequestException('Email already exists');
  }

  const passwordHash = await argon2.hash(dto.password);

  return this.usersService.create({
    username: dto.username,
    email: dto.email,
    passwordHash,
  });
}
async login(dto: LoginUserDto) {
  const user = await this.usersService.findByEmail(dto.email);

  if (!user) {
    throw new UnauthorizedException('Invalid credentials');
  }

  const isPasswordValid = await argon2.verify(
    user.passwordHash,
    dto.password,
  );

  if (!isPasswordValid) {
    throw new UnauthorizedException('Invalid credentials');
  }

  const payload = {
  sub: user.id,
  username: user.username,
};

return {
  access_token: await this.jwtService.signAsync(payload),
};
}
  
}
