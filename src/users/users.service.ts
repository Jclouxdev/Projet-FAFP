import { Injectable } from '@nestjs/common';
import UserEntity from './user.entity';
import CreateUserDto from './dto/create-user.dto';

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
}
