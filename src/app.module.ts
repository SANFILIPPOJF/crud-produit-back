import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProduitsModule } from './produits/produits.module';
import { Produit } from './produits/entities/produit.entity';
import { ProduitsService } from './produits/produits.service';
import { ProduitsController } from './produits/produits.controller';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ProduitsModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT!,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Produit],
      synchronize: true,
      logging: false,
    })
  ],
  controllers: [ProduitsController],
  providers: [ProduitsService],
})
export class AppModule {
  constructor() {
    console.log([join(__dirname, '**', '*.entity.{ts,js}')],);
  }
}
