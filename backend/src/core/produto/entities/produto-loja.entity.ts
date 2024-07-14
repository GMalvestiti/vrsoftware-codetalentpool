import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Loja } from '../../loja/entities/loja.entity';
import { CreateProdutoLojaDto } from '../dto/create-produto-loja.dto';
import { UpdateProdutoLojaDto } from '../dto/update-produto-loja.dto';
import { Produto } from './produto.entity';

@Entity('produtoloja')
export class ProdutoLoja {
  @PrimaryGeneratedColumn({
    primaryKeyConstraintName: 'pk_produtoloja',
    type: 'int',
  })
  id: number;

  @Column({ type: 'int', nullable: false })
  idProduto: number;

  @Column({ type: 'int', nullable: false })
  idLoja: number;

  @Column({ type: 'numeric', precision: 13, scale: 3, nullable: true })
  precoVenda: number;

  @ManyToOne(() => Produto, (produto) => produto.id)
  @JoinColumn({
    name: 'idProduto',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_produto',
  })
  produto: Produto;

  @ManyToOne(() => Loja, (loja) => loja.id)
  @JoinColumn({
    name: 'idLoja',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_loja',
  })
  loja: Loja;

  constructor(
    createProdutoLojaDto: CreateProdutoLojaDto | UpdateProdutoLojaDto,
  ) {
    Object.assign(this, createProdutoLojaDto);
  }
}
