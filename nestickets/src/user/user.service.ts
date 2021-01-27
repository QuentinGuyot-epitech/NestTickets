import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { PwdHashService } from 'src/auth/pwd-hash.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<UserDocument>,
    private readonly hashService: PwdHashService,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }

  async findOne(id: string): Promise<User> {
    try {
      return await this.userModel.findOne({ _id: id });
    } catch (error) {
      throw new NotFoundException('User do not exist');
    }
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(createUserDto);
    newUser.password = await this.hashService.hashPwd(createUserDto.password);
    return await newUser.save();
  }

  async delete(id: string): Promise<User> {
    return await this.userModel.findByIdAndRemove(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    if (updateUserDto.password) {
      const encryptedPwd = await this.hashService.hashPwd(
        updateUserDto.password,
      );
      updateUserDto.password = encryptedPwd;
      return await this.userModel.findByIdAndUpdate(id, updateUserDto, {
        new: true,
      });
    } else if (updateUserDto.tickets) {
      return this.userModel.findByIdAndUpdate(id, {
        $push: { tickets: { $each: updateUserDto.tickets } },
      });
    } else if (updateUserDto.favorite_bands) {
      const user = await this.userModel.findOne({
        _id: id,
        favorite_bands: { $in: updateUserDto.favorite_bands },
      });
      if (user) {
        return this.userModel.findByIdAndUpdate(id, {
          $pullAll: { favorite_bands: updateUserDto.favorite_bands },
        });
      } else {
        const favorite_bands = [...new Set(updateUserDto.favorite_bands)];
        return this.userModel.findByIdAndUpdate(id, {
          $addToSet: { favorite_bands: { $each: favorite_bands } },
        });
      }
    } else {
      return await this.userModel.findByIdAndUpdate(id, updateUserDto, {
        new: true,
      });
    }
  }

  // async update(id: string,createUserDto: CreateUserDto,): Promise<User>{
  //   const user = await this.userModel.findOne({_id : id})
  //   try{
  //     if(createUserDto.password){
  //       const encryptedPwd = await this.hashService.hashPwd(createUserDto.password)
  //       const updatedPwd = {password: encryptedPwd}
  //       return await this.userModel.findByIdAndUpdate(id, updatedPwd, { new: true, });
  //     }else if (createUserDto.is_admin){
  //       const updatedIsAdmin = {is_admin: createUserDto.is_admin}
  //       return await this.userModel.findByIdAndUpdate(id, updatedIsAdmin, { new: true, });
  //     }else if (createUserDto.tickets){
  //       const updatedTickets = {tickets: createUserDto.tickets}
  //       // user.tickets.push(tickets: updatedTickets)
  //       return await this.userModel.findByIdAndUpdate(id, updatedTickets, { new: true, });
  //     }else{
  //       const updatedUser = {username: createUserDto.username, firstname: createUserDto.firstname, lastname: createUserDto.lastname, email: createUserDto.email}
  //       return await this.userModel.findByIdAndUpdate(id, updatedUser, { new: true, });
  //     }
  //   }catch (error){
  //     throw new NotFoundException("User do not exist")
  //   }
  // }

  async findOne_username(username: string): Promise<User> {
    return await this.userModel.findOne({ username: username });
  }

  async validateUserById(userId: string): Promise<boolean> {
    const user = await this.userModel.findById(userId);

    if (user) {
      return true;
    } else {
      return false;
    }
  }
  async register(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userModel.findOne({
      username: createUserDto.username,
    });
    const email = await this.userModel.findOne({ email: createUserDto.email });
    if (user) {
      throw new UnauthorizedException(
        `Username already register with ${createUserDto.username}`,
      );
    } else if (email) {
      throw new UnauthorizedException(
        `Email already register with ${createUserDto.email}`,
      );
    }
    const encryptedPwd = await this.hashService.hashPwd(createUserDto.password);
    const newUser = new this.userModel({
      username: createUserDto.username,
      firstname: createUserDto.firstname,
      lastname: createUserDto.lastname,
      email: createUserDto.email,
      password: encryptedPwd,
      is_admin: createUserDto.is_admin,
    });
    await newUser.save();
    return newUser;
  }
}
