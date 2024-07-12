import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoLoja } from '../produto/entities/produto-loja.entity';
import { Produto } from '../produto/entities/produto.entity';
import { Loja } from './entities/loja.entity';
import { LojaController } from './loja.controller';
import { LojaService } from './loja.service';

@Module({
  imports: [TypeOrmModule.forFeature([Produto, Loja, ProdutoLoja])],
  controllers: [LojaController],
  providers: [LojaService],
})
export class LojaModule {}
