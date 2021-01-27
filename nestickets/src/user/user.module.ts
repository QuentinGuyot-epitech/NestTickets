import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from './schemas/user.schema';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { PwdHashService } from 'src/auth/pwd-hash.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy, PwdHashService],
  exports: [UserService]
})
export class UserModule {}