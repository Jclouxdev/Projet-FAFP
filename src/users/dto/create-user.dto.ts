import {
  IsString,
  IsNotEmpty,
  IsDate,
  IsEmail,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @IsDate()
  birthDate!: Date;

  @IsString()
  @IsNotEmpty()
  city!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  userName!: string;

  @IsString()
  @MinLength(8)
  password!: string;
}
