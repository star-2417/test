import * as crypto from 'crypto';

// 制作一个随机盐
export function makeSalt(): string {
  return crypto.randomBytes(3).toString('base64');
}

// 根据盐来加密密码
export function encryptPassword(password: string, salt: string): string {
  if (!password || !salt) {
    return '';
  }
  const tempSalt = Buffer.from(salt, 'base64');
  return (
    // 10000代表迭代次数 16代表长度
    crypto.pbkdf2Sync(password, tempSalt, 10000, 16, 'sha1').toString('base64')
  );
}
