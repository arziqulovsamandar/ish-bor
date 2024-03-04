import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsEmail,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({ example: 'salima', description: 'Admin ismi' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'chilonzor 11', description: 'Admin manzili' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ example: 'Uzbek1$t0n', description: 'Admin paroli' })
  @IsNotEmpty()
  @IsStrongPassword()
  @MinLength(4)
  password: string;

  @ApiProperty({
    example: 'Uzbek1$t0n',
    description: 'Admin qayta kiritadigan paroli',
  })
  @IsNotEmpty()
  @IsStrongPassword()
  confirim_password: string;

  @ApiProperty({ example: 'salima@mail.uz', description: 'Admin emaili' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '+998881112233',
    description: 'Admin telefon raqami',
  })
  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;

  role_id: number;
  ish_id: number;
}
