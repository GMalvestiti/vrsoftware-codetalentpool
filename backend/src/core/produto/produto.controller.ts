import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { HttpResponse } from '../../shared/classes/http-response';
import {
  IFindAllFilter,
  IFindAllOrder,
} from '../../shared/interfaces/find-all.interface';
import { IResponse } from '../../shared/interfaces/response.interface';
import { FindAllFilterPipe } from '../../shared/pipes/find-all-filter.pipe';
import { FindAllOrderPipe } from '../../shared/pipes/find-all-order.pipe';
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

  @Get(':page/:size/:order')
  async findAll(
    @Param('page') page: number,
    @Param('size') size: number,
    @Param('order', FindAllOrderPipe) order: IFindAllOrder,
    @Query('filter', FindAllFilterPipe)
    filter: IFindAllFilter | IFindAllFilter[],
  ): Promise<IResponse<Produto[]>> {
    const { data, count } = await this.produtoService.findAll(
      page,
      size,
      order,
      filter,
    );

    return new HttpResponse<Produto[]>(data, undefined, count);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<IResponse<Produto>> {
    const data = await this.produtoService.findOne(id);

    return new HttpResponse<Produto>(data);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateProdutoDto: UpdateProdutoDto,
  ): Promise<IResponse<Produto>> {
    const data = await this.produtoService.update(id, updateProdutoDto);

    return new HttpResponse<Produto>(data).onUpdate();
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<IResponse<boolean>> {
    const data = await this.produtoService.remove(id);

    return new HttpResponse<boolean>(data).onDeleted();
  }
}
