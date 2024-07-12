import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { EMensagem } from '../../../shared/enums/mensagem.enum';
import { CreateProdutoLojaDto } from './create-produto-loja.dto';

export class UpdateProdutoLojaDto extends PartialType(CreateProdutoLojaDto) {
  @IsNotEmpty({ message: `ID ${EMensagem.DEVE_SER_INFORMADO}` })
  id: number;
}
