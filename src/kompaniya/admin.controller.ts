import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  HttpCode,
  HttpStatus,
  UseGuards,
  Query,
} from '@nestjs/common';
import { KompaniyaService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Kompaniya } from './models/admin.model';
import { Response } from 'express';
import { LoginAdminDto } from './dto/login-admin.dto';
import { AdminGuard } from '../guards/admin.guard';
import { CookieGetter } from '../decorators/cookieGetter.decorator';

@ApiTags('Kompaniya')
@Controller('kompaniya')
export class KompaniyaController {
  constructor(private readonly adminService: KompaniyaService) {}

  @ApiOperation({ summary: 'Register Kompaniya' })
  @ApiResponse({ status: 201, type: Kompaniya })
  @Post('signup')
  registration(
    @Body() createUserDto: CreateAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.registration(createUserDto, res);
  }

  @ApiOperation({ summary: 'Login Kompaniya' })
  @ApiResponse({ status: 200, type: Kompaniya })
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  login(
    @Body() loginAdminDto: LoginAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.login(loginAdminDto, res);
  }

  @ApiOperation({ summary: 'Logout Kompaniya' })
  @ApiResponse({ status: 200, type: Kompaniya })
  @HttpCode(HttpStatus.OK)
  @UseGuards(AdminGuard)
  @Post('signout')
  logout(
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.logout(refreshToken, res);
  }

  @ApiOperation({ summary: 'RefreshToken Kompaniya' })
  @ApiResponse({ status: 200, type: Kompaniya })
  @HttpCode(HttpStatus.OK)
  @Post(':id/refresh')
  refresh(
    @Param('id') id: string,
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.refreshToken(+id, refreshToken, res);
  }

  @ApiOperation({ summary: 'All Kompaniya' })
  @ApiResponse({ status: 200, type: Kompaniya })
  @UseGuards(AdminGuard)
  @Get('all')
  findAll() {
    return this.adminService.findAllAdmin();
  }

  @ApiOperation({ summary: 'Search Kompaniya' })
  @ApiResponse({ status: 200, type: Kompaniya })
  @HttpCode(HttpStatus.OK)
  @UseGuards(AdminGuard)
  @Get('search')
  findAllFilter(
    @Query('name') name: string,
    @Query('last_name') last_name: string,
    @Query('email') email: string,
  ) {
    return this.adminService.SearchAdmin({ name, last_name, email });
  }

  @ApiOperation({ summary: 'find One by Kompaniya' })
  @ApiResponse({ status: 200, type: Kompaniya })
  @HttpCode(HttpStatus.OK)
  @UseGuards(AdminGuard)
  @Get('findOne/:id')
  findOne(@Param('id') id: string) {
    return this.adminService.findByAdmin(+id);
  }

  @ApiOperation({ summary: 'delete by id by Kompaniya' })
  @ApiResponse({ status: 200, type: Number })
  @UseGuards(AdminGuard)
  @Delete('remove/:id')
  remove(@Param('id') id: string) {
    return this.adminService.removeByAdmin(+id);
  }
}
