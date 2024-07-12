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
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { Produto } from './entities/produto.entity';
import { ProdutoService } from './produto.service';

@Controller('produto')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Post()
  async create(@Body() createProdutoDto: CreateProdutoDto) {
    const data = await this.produtoService.create(createProdutoDto);

    return new HttpResponse<Produto>(data).onCreated();
  }

  @Get()
  findAll() {
    return this.produtoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<IResponse<Produto>> {
    const data = await this.produtoService.findOne(id);

    return new HttpResponse<Produto>(data);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProdutoDto: UpdateProdutoDto) {
    return this.produtoService.update(+id, updateProdutoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<IResponse<boolean>> {
    const data = await this.produtoService.remove(id);

    return new HttpResponse<boolean>(data).onDeleted();
  }
}
