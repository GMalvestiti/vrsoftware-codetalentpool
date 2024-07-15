import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProdutoLoja } from '../../produtoloja/entities/produto-loja.entity';
import { CreateProdutoDto } from '../dto/create-produto.dto';
import { UpdateProdutoDto } from '../dto/update-produto.dto';

@Entity('produto')
export class Produto {
  @PrimaryGeneratedColumn({
    primaryKeyConstraintName: 'pk_produto',
    type: 'int',
  })
  id: number;

  @Column({ type: 'varchar', length: 60, nullable: false })
  descricao: string;

  @Column({ type: 'numeric', precision: 13, scale: 3, nullable: true })
  custo: number;

  @Column({ type: 'bytea', nullable: true })
  imagem: string;

  @OneToMany(() => ProdutoLoja, (produtoloja) => produtoloja.produto, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  produtoloja: ProdutoLoja[];

  constructor(createProdutoDto: CreateProdutoDto | UpdateProdutoDto) {
    Object.assign(this, createProdutoDto);
  }
}
