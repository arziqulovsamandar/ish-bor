import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Table, Model, HasMany } from 'sequelize-typescript';
import { Ish } from 'src/ish/models/media.model';
import { Ishchilar } from 'src/ishchilar/models/admin.model';

interface CategoryAttrs {
  name: string;
  description: string;
}

@Table({ tableName: 'Category' })
export class Category extends Model<Category, CategoryAttrs> {
  @ApiProperty({ example: '1', description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Fruits', description: 'Category name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    example: 'This is red apple',
    description: 'About category',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @HasMany(() => Ishchilar)
  ishchilar: Ishchilar[];

  @HasMany(() => Ish)
  ish: Ish[];
}
