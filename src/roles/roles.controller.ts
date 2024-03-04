import { Controller, Body, Post, Get, Query, UseGuards } from '@nestjs/common';
import { RoleService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './models/role.model';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AdminGuard } from '../guards/admin.guard';

@ApiTags('Roles')
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiOperation({ summary: 'Create role' })
  @ApiResponse({ status: 200, description: 'New role', type: [Role] })
  @UseGuards(AdminGuard)
  @Post('create')
  async createRole(@Body() createRoleDto: CreateRoleDto) {
    const role = await this.roleService.createRole(createRoleDto);
    return role;
  }

  @ApiOperation({ summary: 'Get all roles' })
  @ApiResponse({ status: 200, description: 'All roles', type: [Role] })
  @UseGuards(AdminGuard)
  @Get('all')
  async getAllRoles(): Promise<Role[]> {
    const roles = await this.roleService.getAllRoles();
    return roles;
  }

  @ApiOperation({ summary: 'Get role by name' })
  @UseGuards(AdminGuard)
  @Post('search')
  search(@Query('name') name: string) {
    return this.roleService.search(name);
  }
}
