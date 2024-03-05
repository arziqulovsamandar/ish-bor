import { Module } from '@nestjs/common';
import { KompaniyaService } from './admin.service';
import { KompaniyaController } from './admin.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Kompaniya } from './models/admin.model';
import { JwtModule } from '@nestjs/jwt';
import { Ish } from 'src/ish/models/media.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Kompaniya, Ish]),
    JwtModule.register({}),
  ],
  controllers: [KompaniyaController],
  providers: [KompaniyaService],
  exports: [KompaniyaService],
})
export class KompaniyaModule {}
