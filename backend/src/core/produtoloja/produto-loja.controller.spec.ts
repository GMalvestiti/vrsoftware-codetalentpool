import { Test, TestingModule } from '@nestjs/testing';
import { ProdutolojaController } from './produto-loja.controller';
import { ProdutolojaService } from './produto-loja.service';

describe('ProdutolojaController', () => {
  let controller: ProdutolojaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProdutolojaController],
      providers: [ProdutolojaService],
    }).compile();

    controller = module.get<ProdutolojaController>(ProdutolojaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
