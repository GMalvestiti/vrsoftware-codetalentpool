import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EMensagem } from '../../shared/enums/mensagem.enum';
import { IResponse } from '../../shared/interfaces/response.interface';
import { CreateProdutoLojaDto } from './dto/create-produto-loja.dto';
import { UpdateProdutoLojaDto } from './dto/update-produto-loja.dto';
import { ProdutoLoja } from './entities/produto-loja.entity';

@Injectable()
export class ProdutoLojaService {
  @InjectRepository(ProdutoLoja)
  private repository: Repository<ProdutoLoja>;

  async create(
    createProdutoLojaDto: CreateProdutoLojaDto,
  ): Promise<ProdutoLoja> {
    const produtoLoja = new ProdutoLoja(createProdutoLojaDto);

    const novoProdutoLoja = this.repository.create(produtoLoja);

    return await this.repository.save(novoProdutoLoja);
  }

  async findAll(id: number): Promise<IResponse<ProdutoLoja[]>> {
    const [data, count] = await this.repository.findAndCount({
      where: { idProduto: id },
    });

    return { data, count, message: null };
  }

  async update(
    id: number,
    updateProdutoLojaDto: UpdateProdutoLojaDto,
  ): Promise<ProdutoLoja> {
    if (id !== updateProdutoLojaDto.id) {
      throw new HttpException(
        EMensagem.IDS_DIFERENTES,
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    const produtoLoja = await this.repository.findOne({
      select: ['id'],
      where: { id: updateProdutoLojaDto.id },
    });

    if (!produtoLoja) {
      throw new HttpException(
        EMensagem.IMPOSSIVEL_ALTERAR,
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    const updateProdutoLoja = new ProdutoLoja(updateProdutoLojaDto);

    return await this.repository.save(updateProdutoLoja);
  }

  async remove(id: number): Promise<boolean> {
    const produtoLoja = await this.repository.findOne({
      where: { id: id },
    });

    if (!produtoLoja) {
      throw new HttpException(
        EMensagem.IMPOSSIVEL_REMOVER,
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    await this.repository.delete(id);

    return true;
  }
}
