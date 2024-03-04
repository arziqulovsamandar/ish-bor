import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Category } from './models/category.model';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AdminGuard } from '../guards/admin.guard';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({ summary: 'Add category' })
  @ApiResponse({ status: 200, description: 'New  Category', type: [Category] })
  @UseGuards(AdminGuard)
  @Post('create')
  async create(@Body() createMediaDto: CreateCategoryDto) {
    return this.categoryService.create(createMediaDto);
  }

  @ApiOperation({ summary: 'View all categories' })
  @ApiResponse({
    status: 200,
    description: 'List of categories',
    type: [Category],
  })
  @Get('all')
  async findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @ApiOperation({ summary: 'Category  edit' })
  @ApiResponse({ status: 200, description: 'Category by Id', type: [Category] })
  @UseGuards(AdminGuard)
  @Put(':id')
  async updateById(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.updateById(+id, updateCategoryDto);
  }

  @ApiOperation({ summary: 'View category by id' })
  @ApiResponse({ status: 200, description: 'Category', type: Category })
  @Get(':id')
  async findById(@Param('id') id: string): Promise<Category> {
    return this.categoryService.findById(+id);
  }

  @ApiOperation({ summary: 'Delete Category' })
  @ApiResponse({
    status: 200,
    description: 'Deleted Category',
    type: [Category],
  })
  @UseGuards(AdminGuard)
  @Delete(':id')
  async deleteById(@Param('id') id: string): Promise<number> {
    return this.categoryService.deleteById(+id);
  }

  @ApiOperation({ summary: 'Search category' })
  @Post('search')
  search(@Query('name') name: string) {
    return this.categoryService.search(name);
  }
}
