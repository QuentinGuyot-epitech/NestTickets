import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module'
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { PwdHashService } from './pwd-hash.service';




@Module({
  imports: [
    UserModule,
    PassportModule,
  JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: {expiresIn: '1d'},
  }),
],
  providers: [AuthService, LocalStrategy, JwtStrategy, PwdHashService],
  exports:[AuthService, JwtStrategy],
})
export class AuthModule {}
