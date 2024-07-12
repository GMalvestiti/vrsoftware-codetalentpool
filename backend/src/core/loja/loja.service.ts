import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EMensagem } from '../../shared/enums/mensagem.enum';
import { CreateLojaDto } from './dto/create-loja.dto';
import { UpdateLojaDto } from './dto/update-loja.dto';
import { Loja } from './entities/loja.entity';

@Injectable()
export class LojaService {
  @InjectRepository(Loja)
  private repository: Repository<Loja>;

  async create(createLojaDto: CreateLojaDto): Promise<Loja> {
    const loja = new Loja(createLojaDto);

    const novaLoja = this.repository.create(loja);

    return await this.repository.save(novaLoja);
  }

  findAll() {
    return `This action returns all loja`;
  }

  async findOne(id: number): Promise<Loja> {
    return await this.repository.findOne({ where: { id: id } });
  }

  update(id: number, updateLojaDto: UpdateLojaDto) {
    return `This action updates a #${id} loja`;
  }

  async remove(id: number): Promise<boolean> {
    const loja = await this.repository.findOne({ where: { id: id } });

    if (!loja) {
      throw new HttpException(
        EMensagem.IMPOSSIVEL_REMOVER,
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    await this.repository.delete(loja);

    return true;
  }
}
