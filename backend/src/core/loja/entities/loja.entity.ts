import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProdutoLoja } from '../../produto/entities/produto-loja.entity';

@Entity('loja')
export class Loja {
  @PrimaryGeneratedColumn({
    primaryKeyConstraintName: 'pk_loja',
    type: 'int',
  })
  id: number;

  @Column({ type: 'varchar', length: 60, nullable: false })
  descricao: string;

  @OneToMany(() => ProdutoLoja, (produtoloja) => produtoloja.loja, {
    eager: true,
    onDelete: 'CASCADE',
    cascade: ['insert', 'remove'],
    orphanedRowAction: 'delete',
  })
  produtoloja: ProdutoLoja[];
}
