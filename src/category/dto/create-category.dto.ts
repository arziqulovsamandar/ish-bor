import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'Fruits',
    description: 'category name',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'This is red apple',
    description: 'About Fruit',
  })
  @IsNotEmpty()
  @IsString()
  description: string;
}
