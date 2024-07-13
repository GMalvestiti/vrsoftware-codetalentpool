import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EMensagem } from '../../shared/enums/mensagem.enum';
import { IResponse } from '../../shared/interfaces/response.interface';
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

  async findAll(): Promise<IResponse<Loja[]>> {
    const [data, count] = await this.repository.findAndCount({
      // loadEagerRelations: false,
    });

    return { data, count, message: null };
  }

  async findOne(id: number): Promise<Loja> {
    return await this.repository.findOne({ where: { id: id } });
  }

  async update(id: number, updateLojaDto: UpdateLojaDto): Promise<Loja> {
    if (id !== updateLojaDto.id) {
      throw new HttpException(
        EMensagem.IDS_DIFERENTES,
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    const loja = await this.repository.findOne({
      select: ['id'],
      where: { id: updateLojaDto.id },
    });

    if (!loja) {
      throw new HttpException(
        EMensagem.IMPOSSIVEL_ALTERAR,
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    const updateLoja = new Loja(updateLojaDto);

    return await this.repository.save(updateLoja);
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
