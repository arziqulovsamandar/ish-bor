import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './models/category.model';
import { Op } from 'sequelize';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category) private categoryRepository: typeof Category
  ) {}

  async create(createMediaDto: CreateCategoryDto) {
    const media = await this.categoryRepository.create(createMediaDto);
    return media;
  }

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.findAll();
  }

  async findById(id: number): Promise<Category> {
    const category = await this.categoryRepository.findByPk(id);
    return category;
  }

  async deleteById(id: number): Promise<number> {
    const category = await this.categoryRepository.destroy({ where: { id } });
    return category;
  }

  async updateById(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.categoryRepository.update(updateCategoryDto, {
      where: { id },
      returning: true,
    });

    return category[1][0];
  }

  async search(name: string) {
    const where = {};

    if (name) {
      where['name'] = {
        [Op.like]: `%${name}%`,
      };
    }
    const category = await Category.findAll({ where });
    if (!category) {
      throw new BadRequestException('Category not found');
    }
    return category;
  }
}
