import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersServices: UsersService) {}

  //'postUser()' will handle the creating of new User
  @Post()
  postUser(
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    user: CreateUserDto,
  ) {
    return this.usersServices.insert(user);
  }

  // 'getAll()' returns the list of all the existing users in the database
  @Get()
  getAll() {
    return this.usersServices.getAllUsers();
  }

  // GetById
  @Get(':id')
  getById(@Param('id') id: number) {
    return this.usersServices.getById(id);
  }

  // 'updateUser()' update a row with new DTO
  @Patch(':id')
  updateUser(
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    user: UpdateUserDto,
    @Param('id') id: number,
  ) {
    return this.usersServices.update(user, id);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.usersServices.removeById(id);
  }
}
