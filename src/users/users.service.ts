import {
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import UserEntity from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  async insert(userDetails: CreateUserDto): Promise<UserEntity> {
    const userEntity: UserEntity = UserEntity.create();
    const { name, lastName, birthDate, city, email, userName, password } =
      userDetails;
    userEntity.name = name;
    userEntity.lastName = lastName;
    userEntity.birthDate = birthDate;
    userEntity.city = city;
    userEntity.email = email;
    userEntity.userName = userName;
    userEntity.password = password;
    await UserEntity.save(userEntity);
    return userEntity;
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return await UserEntity.find();
  }

  async getById(id: number): Promise<UserEntity> {
    const getUserById = await UserEntity.findOne({
      where: {
        id: id,
      },
    });
    if (getUserById === null) {
      throw new NotFoundException('user does not exist');
    } else {
      return getUserById;
    }
  }

  async removeById(id: number) {
    if (
      (await UserEntity.findOne({
        where: {
          id: id,
        },
      })) != null
    ) {
      await UserEntity.delete(id);
      return HttpStatus.OK + ' : user successfully removed';
    } else {
      throw new NotFoundException('user does not exist');
    }
  }

  async update(userDetails: UpdateUserDto, id: number): Promise<UserEntity> {
    const user = await UserEntity.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`no user found matching id : ${id}`);
    }

    if (userDetails.newPassword || userDetails.email) {
      const hashedOldPassword = await bcrypt.hash(userDetails.oldPassword, 10);
      if (hashedOldPassword !== user.password) {
        throw new UnauthorizedException('invalid password');
      }
    }

    const userEntity = UserEntity.create();
    userEntity.name = userDetails.name;
    userEntity.lastName = userDetails.lastName;
    userEntity.birthDate = userDetails.birthDate;
    userEntity.city = userDetails.city;
    userEntity.email = userDetails.email;
    userEntity.userName = userDetails.userName;
    userEntity.password = userDetails.newPassword;

    await UserEntity.update(id, userEntity);
    return userEntity;
  }
}
