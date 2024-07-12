import { PartialType } from '@nestjs/mapped-types';
import { IsInt, IsNotEmpty } from 'class-validator';
import { EMensagem } from '../../../shared/enums/mensagem.enum';
import { CreateLojaDto } from './create-loja.dto';

export class UpdateLojaDto extends PartialType(CreateLojaDto) {
  @IsNotEmpty({ message: `id ${EMensagem.DEVE_SER_INFORMADO}` })
  @IsInt({ message: `id ${EMensagem.TIPO_INVALIDO}` })
  id: number;
}
