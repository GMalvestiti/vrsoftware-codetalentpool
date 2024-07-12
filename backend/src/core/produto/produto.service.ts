import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EMensagem } from '../../shared/enums/mensagem.enum';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { Produto } from './entities/produto.entity';

@Injectable()
export class ProdutoService {
  @InjectRepository(Produto)
  private repository: Repository<Produto>;

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

  findAll() {
    return `This action returns all produto`;
  }

  async findOne(id: number): Promise<Produto> {
    return await this.repository.findOne({ where: { id: id } });
  }

  update(id: number, updateProdutoDto: UpdateProdutoDto) {
    return `This action updates a #${id} produto`;
  }

  remove(id: number) {
    return `This action removes a #${id} produto`;
  }
}
