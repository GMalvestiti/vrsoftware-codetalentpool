import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EMensagem } from '../../shared/enums/mensagem.enum';
import { handleFilter } from '../../shared/helpers/sql.helper';
import {
  IFindAllFilter,
  IFindAllOrder,
} from '../../shared/interfaces/find-all.interface';
import { IResponse } from '../../shared/interfaces/response.interface';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { ProdutoLoja } from './entities/produto-loja.entity';
import { Produto } from './entities/produto.entity';

@Injectable()
export class ProdutoService {
  @InjectRepository(Produto)
  private repository: Repository<Produto>;

  @InjectRepository(ProdutoLoja)
  private repositoryProdutoLoja: Repository<ProdutoLoja>;

  async create(createProdutoDto: CreateProdutoDto): Promise<Produto> {
    if (
      !createProdutoDto.produtoloja ||
      createProdutoDto.produtoloja.length === 0
    ) {
      throw new HttpException(
        EMensagem.IMPOSSIVEL_CADASTRAR,
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    const oProduto = new Produto(createProdutoDto);

    const novoProduto = this.repository.create(oProduto);

    return await this.repository.save(novoProduto);
  }

  async findAll(
    page: number,
    size: number,
    order: IFindAllOrder,
    filter?: IFindAllFilter | IFindAllFilter[],
  ): Promise<IResponse<Produto[]>> {
    const where = handleFilter(filter);

    const [data, count] = await this.repository.findAndCount({
      // loadEagerRelations: false,
      order: { [order.column]: order.sort },
      where,
      skip: size * page,
      take: size,
    });

    return { data, count, message: null };
  }

  async findOne(id: number): Promise<Produto> {
    return await this.repository.findOne({ where: { id: id } });
  }

  async update(
    id: number,
    updateProdutoDto: UpdateProdutoDto,
  ): Promise<Produto> {
    if (id !== updateProdutoDto.id) {
      throw new HttpException(
        EMensagem.IDS_DIFERENTES,
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    const produto = await this.repository.findOne({
      select: ['id'],
      where: { id: updateProdutoDto.id },
    });

    if (produto && produto.id !== id) {
      throw new HttpException(
        EMensagem.IMPOSSIVEL_ALTERAR,
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    await this.repositoryProdutoLoja.delete({ idProduto: id });

    for (const produtoloja in updateProdutoDto.produtoloja) {
      Object.assign(updateProdutoDto.produtoloja[produtoloja], {
        idProduto: id,
      });
    }

    return await this.repository.save(updateProdutoDto);
  }

  async remove(id: number): Promise<boolean> {
    const produto = await this.repository.findOne({ where: { id: id } });

    if (!produto) {
      throw new HttpException(
        EMensagem.IMPOSSIVEL_REMOVER,
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    await this.repositoryProdutoLoja.delete({ idProduto: id });

    await this.repository.delete(id);

    return true;
  }
}
