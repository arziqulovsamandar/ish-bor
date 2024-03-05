import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class LoginAdminDto {
  @ApiProperty({
    example: '+998333360044',
    description: 'Foydalanuvchi telefon raqami',
  })
  @IsNotEmpty()
  phone: number;

  @ApiProperty({ example: 'Uzbek1$t0n', description: 'Foydalanuvchi  paroli' })
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
