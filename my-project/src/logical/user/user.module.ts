import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  // 这里直接引入UserService、UserController的好处：当其它Module想引入User的时候，
  // 就不用同时引入Service和Controller了
  // controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
