import { IsDate, IsEmail, IsNotEmpty } from 'class-validator';
import { OmitType, PartialType } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  surname: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  jobTitle: string;

  // @IsDate()
  @IsNotEmpty()
  birthDate: Date;

  @IsNotEmpty()
  country: string;

  @IsNotEmpty()
  gender: string;
}

export class UpdateUser extends PartialType(CreateUserDto) {}
