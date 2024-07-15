import { IsInt, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { EMensagem } from '../../../shared/enums/mensagem.enum';

export class CreateProdutoLojaDto {
  @IsNotEmpty({ message: `idLoja ${EMensagem.NAO_PODE_SER_VAZIO}` })
  @IsInt({ message: `idLoja ${EMensagem.TIPO_INVALIDO}` })
  idLoja: number;

  @IsOptional()
  @IsNumber({}, { message: `precoVenda ${EMensagem.TIPO_INVALIDO}` })
  precoVenda: number;
}
