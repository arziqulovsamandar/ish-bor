import { Injectable } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Ish } from './models/media.model';

@Injectable()
export class IshService {
  constructor(@InjectModel(Ish) private mediaRepository: typeof Ish) {}

  async create(createMediaDto: CreateMediaDto) {
    const media = await this.mediaRepository.create(createMediaDto);
    return media;
  }

  async findAll(): Promise<Ish[]> {
    return this.mediaRepository.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Ish> {
    const media = await this.mediaRepository.findByPk(id);
    return media;
  }

  async update(id: number, updateMediaDto: UpdateMediaDto): Promise<Ish> {
    const builder = await this.mediaRepository.update(updateMediaDto, {
      where: { id },
      returning: true,
    });
    return builder[1][0].dataValues;
  }

  async delete(id: number): Promise<void> {
    const numRowsDeleted = await this.mediaRepository.destroy({
      where: { id },
    });

    if (numRowsDeleted === 0) {
      throw new Error(`Could not delete venue type with id ${id}`);
    }
  }
}
