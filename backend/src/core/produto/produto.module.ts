import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Loja } from '../loja/entities/loja.entity';
import { ProdutoLoja } from '../produtoloja/entities/produto-loja.entity';
import { Produto } from './entities/produto.entity';
import { ProdutoController } from './produto.controller';
import { ProdutoService } from './produto.service';

@Module({
  imports: [TypeOrmModule.forFeature([Produto, Loja, ProdutoLoja])],
  controllers: [ProdutoController],
  providers: [ProdutoService],
})
export class ProdutoModule {}
