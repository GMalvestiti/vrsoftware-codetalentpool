import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from '../produto/entities/produto.entity';
import { ProdutoLoja } from '../produtoloja/entities/produto-loja.entity';
import { Loja } from './entities/loja.entity';
import { LojaController } from './loja.controller';
import { LojaService } from './loja.service';

@Module({
  imports: [TypeOrmModule.forFeature([Produto, Loja, ProdutoLoja])],
  controllers: [LojaController],
  providers: [LojaService],
})
export class LojaModule {}
