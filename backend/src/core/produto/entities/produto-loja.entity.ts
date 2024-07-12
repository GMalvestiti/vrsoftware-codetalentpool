import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Loja } from '../../loja/entities/loja.entity';
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

  @ManyToOne(() => Produto, (produto) => produto.id)
  @JoinColumn({
    name: 'idProduto',
    foreignKeyConstraintName: 'fk_produto',
  })
  produto: Produto;

  @ManyToOne(() => Loja, (loja) => loja.id)
  @JoinColumn({
    name: 'idLoja',
    foreignKeyConstraintName: 'fk_loja',
  })
  loja: Loja;
}
