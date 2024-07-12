import { IsInt, IsNotEmpty } from 'class-validator';
import { EMensagem } from '../../../shared/enums/mensagem.enum';

export class CreateProdutoLojaDto {
  @IsNotEmpty({ message: `idProduto ${EMensagem.NAO_PODE_SER_VAZIO}` })
  @IsInt()
  idProduto: number;

  @IsNotEmpty({ message: `idLoja ${EMensagem.NAO_PODE_SER_VAZIO}` })
  @IsInt()
  idLoja: number;
}
