import { Module } from '@nestjs/common';
import { IshService } from './media.service';
import { IshController } from './media.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Ish } from './models/media.model';
import { JwtModule } from '@nestjs/jwt';
import { Category } from 'src/category/models/category.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Ish, Category]),
    JwtModule.register({}),
  ],
  controllers: [IshController],
  providers: [IshService],
  exports: [IshService],
})
export class IshModule {}
