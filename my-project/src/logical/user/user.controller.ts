import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Result } from 'config/result.interface';
import { AuthService } from '../auth/auth.service';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  // @Get(':id')
  // async findOne(@Param('id') id: number): Promise<Result> {
  //   const data = await this.userService.find(id);
  //   return { code: 200, message: '查询成功！', data };
  // }
  @Post('login')
  async login(@Body() loginParmas: any) {
    console.log('JWT验证 - Step 1：用户请求登录！');
    const authResult = await this.authService.validateUser(
      loginParmas.account_name,
      loginParmas.password,
    );

    switch (authResult.code) {
      case 1:
        return this.authService.certificate(authResult.user);
      case 2:
        return { code: 600, message: '账号或者密码不正确！' };
      default:
        return { code: 600, message: '查无此人！' };
    }
  }

  @UseGuards(AuthGuard('jwt')) //使用JWT进行验证
  @Post('register')
  async register(@Body() body: any) {
    return await this.userService.register(body);
  }
}
