import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Result } from 'config/result.interface';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Get(':id')
  // async findOne(@Param('id') id: number): Promise<Result> {
  //   const data = await this.userService.find(id);
  //   return { code: 200, message: '查询成功！', data };
  // }
  @Post('register')
  async register(@Body() body: any) {
    return await this.userService.register(body);
  }
}
