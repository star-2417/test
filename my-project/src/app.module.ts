import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './logical/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './logical/auth/auth.module';
import { UserController } from './logical/user/user.controller';

@Module({
  imports: [
    UserModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'wsxokn258lxl',
      database: 'login',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
