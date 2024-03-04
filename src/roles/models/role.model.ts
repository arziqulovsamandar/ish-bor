import { Column, DataType, Model, Table, HasMany } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Ishchilar } from 'src/ishchilar/models/admin.model';
import { Kompaniya } from 'src/kompaniya/models/admin.model';

interface RoleCreationAttributes {
  name: string;
  description: string;
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleCreationAttributes> {
  @ApiProperty({ example: 1, description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'USER', description: 'User role' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name: string;

  @ApiProperty({ example: 'USER role', description: 'Info about users role' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @HasMany(() => Ishchilar)
  ishchilar: Ishchilar[];

  @HasMany(() => Kompaniya)
  kompaniya: Kompaniya[];
}
