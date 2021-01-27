import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PwdHashService{

    async hashPwd(password:string){
        return await bcrypt.hash(password, 15);
    }

    async comparePwd(plainText, encryptedPwd) : Promise<boolean>{
        return await bcrypt.compare(plainText, encryptedPwd)
    }
}