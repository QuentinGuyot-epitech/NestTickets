import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    UseGuards,
    Request,
  } from '@nestjs/common';
  import { CreateUserDto } from './dto/create-user.dto';
  import { UserService } from './user.service';
  import { User } from './schemas/user.schema';
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  import { UpdateUserDto } from './dto/update-user.dto';
 
  
  
  
  @Controller('')
  export class UserController {
    constructor(
      private readonly userService: UserService,
      // private readonly authService: AuthService,
      ) {}

    @Post('auth/register')
    async register(@Body () createUserDto : CreateUserDto):Promise<User>{
      return await this.userService.register(createUserDto)
    }

    // @UseGuards(JwtAuthGuard) //Needed to protect route
    @Get('users')
    findAll(): Promise<User[]> {
      return this.userService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get("user")
    async user(@Request () req){
      return req.user
    }

    @UseGuards(JwtAuthGuard)
    @Get("auth/logout")
    async logout_user(@Request () req){
      req.logout()
      req.user = null
    }
  
    @Get('user/:id')
    findOne(@Param('id') id): Promise<User> {
      return this.userService.findOne(id);
    }
  
    @Post('user')
    create(@Body() createUserDto: CreateUserDto): Promise<User> {
      return this.userService.create(createUserDto);
    }
  
    @Delete('user/:id')
    delete(@Param('id') id): Promise<User> {
      return this.userService.delete(id);
    }
  
    @Put('user/:id')
    update(
      @Body() updateUserDto: UpdateUserDto,
      @Param('id') id,
    ): Promise<User> {
      return this.userService.update(id, updateUserDto);
    }
  }
  