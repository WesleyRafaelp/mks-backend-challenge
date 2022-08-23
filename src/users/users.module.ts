import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { DataSource } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User]),],
  controllers: [UsersController],
  providers: [UsersService, AuthService, JwtService,],
  exports:[ UsersService,]
})
export class UsersModule {}
