import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  lastName?: string;

  @IsOptional()
  @IsDate()
  birthDate?: Date;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  city?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  userName?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  newPassword?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @ValidateIf(
    (properties) =>
      properties.newPassword !== undefined || properties.email !== undefined,
  )
  @IsString()
  @IsNotEmpty()
  oldPassword?: string;
}
