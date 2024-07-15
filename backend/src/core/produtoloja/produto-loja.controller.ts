import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { HttpResponse } from '../../shared/classes/http-response';
import { IResponse } from '../../shared/interfaces/response.interface';
import { CreateProdutoLojaDto } from './dto/create-produto-loja.dto';
import { UpdateProdutoLojaDto } from './dto/update-produto-loja.dto';
import { ProdutoLoja } from './entities/produto-loja.entity';
import { ProdutoLojaService } from './produto-loja.service';

@Controller('produtoloja')
export class ProdutoLojaController {
  constructor(private readonly produtoLojaService: ProdutoLojaService) {}

  @Post()
  async create(
    @Body() createProdutoLojaDto: CreateProdutoLojaDto,
  ): Promise<IResponse<ProdutoLoja>> {
    const data = await this.produtoLojaService.create(createProdutoLojaDto);

    return new HttpResponse<ProdutoLoja>(data).onCreated();
  }

  @Get(':id')
  async findAll(@Param('id') id: number): Promise<IResponse<ProdutoLoja[]>> {
    const { data, count } = await this.produtoLojaService.findAll(id);

    for (const produtoLoja of data) {
      produtoLoja.precoVenda = Number(produtoLoja.precoVenda);
    }

    return new HttpResponse<ProdutoLoja[]>(data, undefined, count);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateProdutoLojaDto: UpdateProdutoLojaDto,
  ): Promise<IResponse<ProdutoLoja>> {
    const data = await this.produtoLojaService.update(id, updateProdutoLojaDto);

    return new HttpResponse<ProdutoLoja>(data).onUpdate();
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<IResponse<boolean>> {
    console.log(id);

    const data = await this.produtoLojaService.remove(id);

    return new HttpResponse<boolean>(data).onDeleted();
  }
}
