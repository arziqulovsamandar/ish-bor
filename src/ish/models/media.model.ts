import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  Table,
  Model,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { Category } from 'src/category/models/category.model';
import { Kompaniya } from 'src/kompaniya/models/admin.model';

interface MediaAttrs {
  name: string;
  price: string;
  description: string;
  category_id: number;
}

@Table({ tableName: 'Ish' })
export class Ish extends Model<Ish, MediaAttrs> {
  @ApiProperty({ example: '1', description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Elektrik',
    description: 'ish nomi',
  })
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    example: 'narxi',
    description: 'Ish narxi',
  })
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  price: string;

  @ApiProperty({
    example: 'Elektrik',
    description: 'description',
  })
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
    onDelete: 'CASCADE',
  })
  category_id: number;

  @BelongsTo(() => Category)
  category: Category;

  @HasMany(() => Kompaniya)
  kompaniya: Kompaniya[];
}
