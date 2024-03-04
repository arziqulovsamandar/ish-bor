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
  Put,
  UseGuards,
  Query,
} from '@nestjs/common';
import { IshchilarService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Ishchilar } from './models/admin.model';
import { Response } from 'express';
import { LoginAdminDto } from './dto/login-admin.dto';
import { NUMBER } from 'sequelize';
import { selfClientGuard } from '../guards/selfClient.guard';
import { CookieGetter } from '../decorators/cookieGetter.decorator';

@ApiTags('Ishchilar')
@Controller('ishchilar')
export class IshchilarController {
  constructor(private readonly adminService: IshchilarService) {}

  @ApiOperation({ summary: 'Register Ishchilar' })
  @ApiResponse({ status: 201, type: Ishchilar })
  @Post('signup')
  registration(
    @Body() createUserDto: CreateAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.registration(createUserDto, res);
  }

  @ApiOperation({ summary: 'Login Ishchilar' })
  @ApiResponse({ status: 200, type: Ishchilar })
  @HttpCode(HttpStatus.OK)
  @UseGuards(selfClientGuard)
  @Post('signin')
  login(
    @Body() loginAdminDto: LoginAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.login(loginAdminDto, res);
  }

  @ApiOperation({ summary: 'Logout Ishchilar' })
  @ApiResponse({ status: 200, type: Ishchilar })
  @HttpCode(HttpStatus.OK)
  @UseGuards(selfClientGuard)
  @Post('signout')
  logout(
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.logout(refreshToken, res);
  }

  @ApiOperation({ summary: 'RefreshToken Ishchilar' })
  @ApiResponse({ status: 200, type: Ishchilar })
  @HttpCode(HttpStatus.OK)
  @UseGuards(selfClientGuard)
  @Post(':id/refresh')
  refresh(
    @Param('id') id: string,
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.refreshToken(+id, refreshToken, res);
  }

  @ApiOperation({ summary: 'All Ishchilar' })
  @ApiResponse({ status: 200, type: Ishchilar })
  @UseGuards(selfClientGuard)
  @Get('all')
  findAll() {
    return this.adminService.findAllAdmin();
  }

  @ApiOperation({ summary: 'Search Ishchilar' })
  @ApiResponse({ status: 200, type: Ishchilar })
  @HttpCode(HttpStatus.OK)
  @UseGuards(selfClientGuard)
  @Get('search')
  findAllFilter(
    @Query('name') name: string,
    @Query('last_name') last_name: string,
    @Query('email') email: string,
  ) {
    return this.adminService.SearchAdmin({ name, last_name, email });
  }

  @ApiOperation({ summary: 'find One by Ishchilar' })
  @ApiResponse({ status: 200, type: Ishchilar })
  @HttpCode(HttpStatus.OK)
  @UseGuards(selfClientGuard)
  @Get('findOne/:id')
  findOne(@Param('id') id: string) {
    return this.adminService.findByAdmin(+id);
  }

  @ApiOperation({ summary: 'delete by id by Ishchilar' })
  @ApiResponse({ status: 200, type: NUMBER })
  @UseGuards(selfClientGuard)
  @Delete('remove/:id')
  remove(@Param('id') id: string) {
    return this.adminService.removeByAdmin(+id);
  }
}
