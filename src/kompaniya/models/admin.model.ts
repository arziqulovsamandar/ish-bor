import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/roles/models/role.model';
import { Ish } from 'src/ish/models/media.model';

interface AdminAttrs {
  name: string;
  phone: string;
  address: string;
  password: string;
  email: string;
  is_active: boolean;
  hashed_refresh_token: string;
  role: string;
  ish_id: number;
}

@Table({ tableName: 'Kompaniya' })
export class Kompaniya extends Model<Kompaniya, AdminAttrs> {
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
  name: string;

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

  @ApiProperty({
    example: 'Kompaniya',
    description: 'Admin role',
  })
  @Column({
    type: DataType.STRING,
  })
  role: string;

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

  @ForeignKey(() => Ish)
  @Column({
    type: DataType.INTEGER,
    onDelete: 'CASCADE',
  })
  ish_id: number;

  @BelongsTo(() => Ish)
  ish: Ish;
}
