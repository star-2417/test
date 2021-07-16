import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { encryptPassword } from 'src/utils/cryptogram';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // JWT验证 - Step 2：校验用户信息
  async validateUser(username: string, password: string): Promise<any> {
    console.log('JWT验证 - Step 2：校验用户信息！');
    const user = await this.userService.findOne(username);
    if (user) {
      const hashedPassword = user.password;
      const salt = user.passwd_salt;
      console.log(
        '查找用户名结果： ' +
          user.account_name +
          ' ' +
          hashedPassword +
          ' ' +
          salt,
      );
      // 通过用户的密码盐和输入的白密码password，再次生成加密密码，再与数据库里的hashedPassword比较，判断是否相等
      const hashPassword = encryptPassword(password, salt);
      console.log('校验重新生成的加密密码为： ' + hashPassword);
      if (hashedPassword === hashPassword) {
        // 密码正确
        return { code: 1, user };
      } else {
        // 密码错误
        return { code: 2, user: null };
      }
    }

    // 查无此人
    return { code: 3, user: null };
  }

  // JWT验证 - Step 3：处理jwt签证
  async certificate(user: any) {
    const payload = {
      username: user.account_name,
      sub: user.user_id,
      realname: user.real_name,
      userrole: user.user_role,
    };
    console.log('JWT验证 - Step 3：处理jwt签证！');
    console.log(payload);
    try {
      // 用户登录成功则生成一串token，前端拿到这个token，就可以请求其它有守卫的接口了
      // 发放了token，就要能验证token，因此就要用到Guard(守卫)
      const token = this.jwtService.sign(payload);
      return { code: 200, message: '登录成功！', data: { token } };
    } catch (error) {
      return { code: 600, message: '账号或密码错误！' };
    }
  }
}
