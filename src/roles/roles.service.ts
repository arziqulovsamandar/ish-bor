import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './models/role.model';
import { Op } from 'sequelize';
@Injectable()
export class RoleService {
  constructor(@InjectModel(Role) private roleRepo: typeof Role) {}

  async createRole(createRoleDto: CreateRoleDto): Promise<Role> {
    const createRole = await this.roleRepo.create(createRoleDto);
    return createRole;
  }

  async getAllRoles(): Promise<Role[]> {
    const roles = await this.roleRepo.findAll({ include: { all: true } });
    return roles;
  }

  async search(name: string) {
    const where = {};

    if (name) {
      where['name'] = {
        [Op.like]: `%${name}%`,
      };
    }
    const category = await Role.findAll({ where });
    if (!category) {
      throw new BadRequestException('Role not found');
    }
    return category;
  }
}
