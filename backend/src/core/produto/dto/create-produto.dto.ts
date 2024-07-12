import { Type } from 'class-transformer';
import { IsArray, IsBase64, IsNotEmpty, MaxLength } from 'class-validator';
import { EMensagem } from '../../../shared/enums/mensagem.enum';
import { CreateProdutoLojaDto } from './create-produto-loja.dto';

export class CreateProdutoDto {
  @IsNotEmpty({ message: `descricao ${EMensagem.NAO_PODE_SER_VAZIO}` })
  @MaxLength(60, { message: `descricao ${EMensagem.MAIS_CARACTERES_QUE_PERMITIDO}` })
  descricao: string;

  custo: number;

  @IsBase64()
  imagem: string;

  @IsArray({ message: `produtoloja ${EMensagem.TIPO_INVALIDO}` })
  @Type(() => CreateProdutoLojaDto)
  produtoloja: CreateProdutoLojaDto[] | UpdateProdutoLojaDto[];
}
