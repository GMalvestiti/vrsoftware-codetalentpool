import { Type } from 'class-transformer';
import {
  IsArray,
  IsBase64,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  MaxLength,
} from 'class-validator';
import { EMensagem } from '../../../shared/enums/mensagem.enum';
import { CreateProdutoLojaDto } from './create-produto-loja.dto';
import { UpdateProdutoLojaDto } from './update-produto-loja.dto';

export class CreateProdutoDto {
  @IsNotEmpty({ message: `descricao ${EMensagem.NAO_PODE_SER_VAZIO}` })
  @MaxLength(60, {
    message: `descricao ${EMensagem.MAIS_CARACTERES_QUE_PERMITIDO}`,
  })
  descricao: string;

  @IsOptional()
  @IsNumber({}, { message: `custo ${EMensagem.TIPO_INVALIDO}` })
  custo: number;

  @IsOptional()
  @IsBase64({}, { message: `imagem ${EMensagem.TIPO_INVALIDO}` })
  imagem: string;

  @IsArray({ message: `produtoloja ${EMensagem.TIPO_INVALIDO}` })
  @Type(() => CreateProdutoLojaDto)
  produtoloja: CreateProdutoLojaDto[] | UpdateProdutoLojaDto[];
}
