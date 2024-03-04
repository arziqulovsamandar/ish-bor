import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMediaDto {
  @ApiProperty({
    example: 'name',
    description: 'Ish nomi',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'narxi',
    description: 'Ish narxi',
  })
  @IsString()
  @IsNotEmpty()
  price: string;

  @ApiProperty({
    example: 'description',
    description: 'Ish description',
  })
  @IsString()
  @IsNotEmpty()
  description: string;


}
