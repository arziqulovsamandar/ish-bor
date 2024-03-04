import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from 'src/category/models/category.model';
import { Role } from 'src/roles/models/role.model';

interface AdminAttrs {
  first_name: string;
  last_name: string;
  phone: string;
  age: number;
  address: string;
  password: string;
  email: string;
  is_active: boolean;
  hashed_refresh_token: string;
  category_id: number;
  role_id: number;
}

@Table({ tableName: 'Ishchilar' })
export class Ishchilar extends Model<Ishchilar, AdminAttrs> {
  @ApiProperty({ example: 1, description: 'Unikal Id' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'John', description: 'Admin ismi' })
  @Column({
    type: DataType.STRING,
  })
  first_name: string;

  @ApiProperty({ example: 'John', description: 'Admin ismi' })
  @Column({
    type: DataType.STRING,
  })
  last_name: string;

  @ApiProperty({ example: '21', description: 'Admin yoshi' })
  @Column({
    type: DataType.INTEGER,
  })
  age: number;

  @ApiProperty({ example: 'admin@mail.uz', description: 'Admin email' })
  @Column({
    type: DataType.STRING,
    unique: true,
  })
  email: string;

  @ApiProperty({ example: 'Uzbek!$t0n', description: 'Admin paroli' })
  @Column({
    type: DataType.STRING,
  })
  password: string;

  @ApiProperty({ example: 'chilonzor', description: 'Admin manzili' })
  @Column({
    type: DataType.STRING,
  })
  address: string;

  @ApiProperty({
    example: '+998881112233',
    description: 'Admin telefon nomeri',
  })
  @Column({
    type: DataType.STRING,
  })
  phone: string;

  @ApiProperty({ example: 'false', description: 'Admin activligi' })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  is_active: boolean;

  @ApiProperty({
    example: 'dsf7787cvnc9s_kjsjfndf7',
    description: 'Admin hashed refresh tokeni',
  })
  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
    onDelete: 'CASCADE',
  })
  category_id: number;

  @BelongsTo(() => Category)
  category: Category;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
    onDelete: 'CASCADE',
  })
  role_id: number;

  @BelongsTo(() => Role)
  role: Role;
}
