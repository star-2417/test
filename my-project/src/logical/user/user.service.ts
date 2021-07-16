import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { encryptPassword, makeSalt } from 'src/utils/cryptogram';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // 查询是否有该用户
  async findOne(username: string): Promise<any | undefined> {
    const sql = `select * from users where account_name = '${username}'`;

    try {
      const user = (await this.userRepository.query(sql))[0];
      return user;
    } catch (error) {
      console.error(error);
      return void 0;
    }
  }

  // 注册
  async register(requestBody: any): Promise<any> {
    const { accountName, realName, password, repassword } = requestBody;

    if (password !== repassword) {
      return { code: 400, message: '两次密码输入不一致！' };
    }

    const user = await this.findOne(accountName);
    if (user) {
      return { code: 400, message: '用户已存在，您可进行登录！' };
    }

    const salt = makeSalt(); //制作密码盐
    const hashPwd = encryptPassword(password, salt); //加密密码
    const registerSQL = `
      insert into users (account_name, real_name, password, passwd_salt, user_role, user_status)
      values ('${accountName}', '${realName}', '${hashPwd}', '${salt}', 2, 0)`;

    try {
      await this.userRepository.query(registerSQL);
      return { code: 200, message: 'Register Success!' };
    } catch (error) {
      return { code: 503, message: `Service error: ${error}` };
    }
  }
}
