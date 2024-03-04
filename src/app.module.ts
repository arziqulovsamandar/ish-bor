import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { Ish } from './ish/models/media.model';
import { Category } from './category/models/category.model';
import { Kompaniya } from './kompaniya/models/admin.model';
import { Ishchilar } from './ishchilar/models/admin.model';
import { IshModule } from './ish/media.module';
import { KompaniyaModule } from './kompaniya/admin.module';
import { IshchilarModule } from './ishchilar/admin.module';
import { CategoryModule } from './category/category.module';
import { Role } from './roles/models/role.model';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, 'static'),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      models: [Ish, Category, Kompaniya, Ishchilar, Role],
      autoLoadModels: true,
      logging: false,
    }),
    IshModule,
    KompaniyaModule,
    IshchilarModule,
    CategoryModule,
    RolesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
