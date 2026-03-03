import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { JwtStrategy } from './auth/jwt.strategy';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from './users/users.service';
import { ConfigModule } from '@nestjs/config';
import { GoogleStrategy } from './auth/google.strategy';

@Module({
  imports:[
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type:"postgres",
      host:"localhost",
      port:5433,
      username:'postgres',
      password:"vidhya@2004",
      database:"auth_db",
      entities:[User],
      synchronize:true
    }),
    TypeOrmModule.forFeature([User]),

    JwtModule.register({
      secret: 'SECRET_KEY',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers:[AuthController],
  providers:[AuthService,UsersService,JwtStrategy,GoogleStrategy,]
})

export class AppModule{}


