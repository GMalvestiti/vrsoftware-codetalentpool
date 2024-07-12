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
import { CreateLojaDto } from './dto/create-loja.dto';
import { UpdateLojaDto } from './dto/update-loja.dto';
import { Loja } from './entities/loja.entity';
import { LojaService } from './loja.service';

@Controller('loja')
export class LojaController {
  constructor(private readonly lojaService: LojaService) {}

  @Post()
  async create(@Body() createLojaDto: CreateLojaDto): Promise<IResponse<Loja>> {
    const data = await this.lojaService.create(createLojaDto);

    return new HttpResponse<Loja>(data).onCreated();
  }

  @Get()
  findAll() {
    return this.lojaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<IResponse<Loja>> {
    const data = await this.lojaService.findOne(id);

    return new HttpResponse<Loja>(data);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLojaDto: UpdateLojaDto) {
    return this.lojaService.update(+id, updateLojaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lojaService.remove(+id);
  }
}
