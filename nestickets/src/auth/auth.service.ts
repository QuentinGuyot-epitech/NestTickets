import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { PwdHashService } from 'src/auth/pwd-hash.service'

@Injectable()
export class AuthService {
    constructor(
      private userService: UserService,
      private jwtService: JwtService,
      private readonly hashService : PwdHashService,
    ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne_username(username);
    const matchPwd = await this.hashService.comparePwd(pass, user.password)
    if (user && matchPwd == true) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  async login(user: any) {
    // console.log(user)
    const payload = { username: user._doc.username, id: user._doc._id, is_admin: user._doc.is_admin, email: user._doc.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
