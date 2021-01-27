import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from './constants';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    //find user id from the payload//
    const isValidated = await this.userService.validateUserById(payload.id);
    if (isValidated) {
      // console.log(payload)
      return { userId: payload.id, username: payload.username, is_admin : payload.is_admin, email: payload.email };
    } else {
      throw new UnauthorizedException('Unauthorized');
    }
  }
}
