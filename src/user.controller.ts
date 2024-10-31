import { Controller, Post, Body, Put, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, CreateAuthUserDto } from './create-user-dto';
import { UpdateUserDTO } from './update-user-dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<any> {
    return this.userService.createUser(createUserDto);
  }
  @Put(':id')
  async updateUser(
    @Body() updateUserDTO: UpdateUserDTO,
    @Param('id') id,
  ): Promise<any> {
    console.log('soy el endpoint');
    return this.userService.updateUser(updateUserDTO, id);
  }
  @Post('/auth')
  async authUser(@Body() createAuthUserDto: CreateAuthUserDto): Promise<any> {
    return this.userService.createAuthUser(createAuthUserDto);
  }
}
