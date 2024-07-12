import { IsNotEmpty, MaxLength } from 'class-validator';
import { EMensagem } from '../../../shared/enums/mensagem.enum';

export class CreateLojaDto {
  @IsNotEmpty({ message: `descricao ${EMensagem.NAO_PODE_SER_VAZIO}` })
  @MaxLength(60, {
    message: `descricao ${EMensagem.MAIS_CARACTERES_QUE_PERMITIDO}`,
  })
  descricao: string;
}
