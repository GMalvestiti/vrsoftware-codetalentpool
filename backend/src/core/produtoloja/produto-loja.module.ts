import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Loja } from '../loja/entities/loja.entity';
import { Produto } from '../produto/entities/produto.entity';
import { ProdutoLoja } from './entities/produto-loja.entity';
import { ProdutoLojaController } from './produto-loja.controller';
import { ProdutoLojaService } from './produto-loja.service';

@Module({
  imports: [TypeOrmModule.forFeature([Produto, Loja, ProdutoLoja])],
  controllers: [ProdutoLojaController],
  providers: [ProdutoLojaService],
})
export class ProdutoLojaModule {}
