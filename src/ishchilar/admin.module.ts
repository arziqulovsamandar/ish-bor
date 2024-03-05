import { Module } from '@nestjs/common';
import { IshchilarService } from './admin.service';
import { IshchilarController } from './admin.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Ishchilar } from './models/admin.model';
import { JwtModule } from '@nestjs/jwt';
import { Category } from 'src/category/models/category.model';

@Module({
  imports: [SequelizeModule.forFeature([Ishchilar,Category]), JwtModule.register({})],
  controllers: [IshchilarController],
  providers: [IshchilarService],
  exports: [IshchilarService],
})
export class IshchilarModule {}
