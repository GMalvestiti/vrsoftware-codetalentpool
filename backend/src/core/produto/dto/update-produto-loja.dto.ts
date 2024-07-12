import { PartialType } from '@nestjs/mapped-types';
import { IsInt, IsNotEmpty } from 'class-validator';
import { EMensagem } from '../../../shared/enums/mensagem.enum';
import { CreateProdutoLojaDto } from './create-produto-loja.dto';

export class UpdateProdutoLojaDto extends PartialType(CreateProdutoLojaDto) {
  @IsNotEmpty({ message: `id ${EMensagem.DEVE_SER_INFORMADO}` })
  @IsInt({ message: `id ${EMensagem.TIPO_INVALIDO}` })
  id: number;

  @IsNotEmpty({ message: `idProduto ${EMensagem.DEVE_SER_INFORMADO}` })
  @IsInt({ message: `idProduto ${EMensagem.TIPO_INVALIDO}` })
  idProduto: number;
}
