import { Ish } from './models/media.model';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { IshService } from './media.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateMediaDto } from './dto/update-media.dto';
import { AdminGuard } from '../guards/admin.guard';

@ApiTags('Ish')
@Controller('ish')
export class IshController {
  constructor(private readonly mediaService: IshService) {}
  @ApiOperation({ summary: 'Add Ish' })
  @ApiResponse({ status: 200, description: 'New  Ish', type: [Ish] })
  @UseGuards(AdminGuard)
  @Post('create')
  async create(@Body() createMediaDto: CreateMediaDto) {
    return this.mediaService.create(createMediaDto);
  }

  @ApiOperation({ summary: 'View all Ish' })
  @ApiResponse({
    status: 200,
    description: 'List of Ish',
    type: [Ish],
  })
  @Get('all')
  async findAll(): Promise<Ish[]> {
    return this.mediaService.findAll();
  }

  @ApiOperation({ summary: 'Id Serach Ish' })
  @ApiResponse({ status: 200, description: 'Ish', type: Ish })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Ish> {
    return this.mediaService.findOne(id);
  }

  @ApiOperation({ summary: 'Update Ish' })
  @ApiResponse({ status: 200, description: 'Updated Ish', type: [Ish] })
  @UseGuards(AdminGuard)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateTypeDto: UpdateMediaDto,
  ): Promise<Ish> {
    return this.mediaService.update(id, updateTypeDto);
  }

  @ApiOperation({ summary: 'Delete Ish' })
  @ApiResponse({ status: 200, description: 'Deleted Ish', type: [Ish] })
  @UseGuards(AdminGuard)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.mediaService.delete(id);
  }
}
