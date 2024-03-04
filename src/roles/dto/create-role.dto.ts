import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({ example: 'USER', description: 'User role' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'USER role', description: 'Info about users role' })
  @IsNotEmpty()
  @IsString()
  description: string;
}
