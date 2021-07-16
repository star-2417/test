import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { jwtConstants } from './constants';

// 编写jwt的验证策略
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  // JWT验证 - step 4:被守卫调用
  async validate(payload: any) {
    console.log('JWT验证 - Step 4：被守卫调用！');
    return {
      userId: payload.sub,
      username: payload.username,
      realname: payload.realname,
      userrole: payload.userrole,
    };
  }
}
