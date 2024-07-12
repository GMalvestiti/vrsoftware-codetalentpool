import { PartialType } from '@nestjs/mapped-types';
import { IsInt, IsNotEmpty } from 'class-validator';
import { EMensagem } from '../../../shared/enums/mensagem.enum';
import { CreateProdutoDto } from './create-produto.dto';

export class UpdateProdutoDto extends PartialType(CreateProdutoDto) {
  @IsNotEmpty({ message: `id ${EMensagem.DEVE_SER_INFORMADO}` })
  @IsInt({ message: `id ${EMensagem.TIPO_INVALIDO}` })
  id: number;
}
