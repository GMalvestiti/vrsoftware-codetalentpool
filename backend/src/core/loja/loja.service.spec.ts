import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EMensagem } from '../../shared/enums/mensagem.enum';
import { IResponse } from '../../shared/interfaces/response.interface';
import { ProdutoLoja } from '../produtoloja/entities/produto-loja.entity';
import { CreateLojaDto } from './dto/create-loja.dto';
import { UpdateLojaDto } from './dto/update-loja.dto';
import { Loja } from './entities/loja.entity';
import { LojaService } from './loja.service';

describe('LojaService', () => {
  let service: LojaService;
  let repository: Repository<Loja>;
  let repositoryProdutoLoja: Repository<ProdutoLoja>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LojaService,
        {
          provide: getRepositoryToken(Loja),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findAndCount: jest.fn(),
            findOne: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(ProdutoLoja),
          useValue: {
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<LojaService>(LojaService);
    repository = module.get<Repository<Loja>>(getRepositoryToken(Loja));
    repositoryProdutoLoja = module.get<Repository<ProdutoLoja>>(
      getRepositoryToken(ProdutoLoja),
    );
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('criar uma nova loja', async () => {
      const createLojaDto: CreateLojaDto = {
        descricao: 'Loja 01',
      };

      const mockLoja = Object.assign(createLojaDto, { id: 1 });

      const spyRepositorySave = jest
        .spyOn(repository, 'save')
        .mockReturnValue(Promise.resolve(mockLoja) as any);

      const response = await service.create(createLojaDto);

      expect(response).toEqual(mockLoja);
      expect(spyRepositorySave).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('obter uma listagem de lojas', async () => {
      const mockLojas: Loja[] = [
        {
          id: 1,
          descricao: 'Loja 01',
          produtoloja: [],
        },
      ];

      const expected: IResponse<Loja[]> = {
        count: mockLojas.length,
        data: mockLojas,
        message: null,
      };

      const spyRepositoryFindAndCount = jest
        .spyOn(repository, 'findAndCount')
        .mockReturnValue(Promise.resolve([mockLojas, mockLojas.length]));

      const response = await service.findAll();

      expect(response).toEqual(expected);
      expect(spyRepositoryFindAndCount).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('obter uma loja', async () => {
      const mockLoja: Loja = {
        id: 1,
        descricao: 'Loja 01',
        produtoloja: [],
      };

      const spyRepositoryFindOne = jest
        .spyOn(repository, 'findOne')
        .mockReturnValue(Promise.resolve(mockLoja));

      const response = await service.findOne(1);

      expect(response).toEqual(mockLoja);
      expect(spyRepositoryFindOne).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('editar uma loja', async () => {
      const updateLojaDto: UpdateLojaDto = {
        id: 1,
        descricao: 'Loja 01',
      };

      const mockLoja = Object.assign(updateLojaDto);

      const spyRepositoryFindOne = jest
        .spyOn(repository, 'findOne')
        .mockReturnValue(Promise.resolve(mockLoja));

      const spyRepositorySave = jest
        .spyOn(repository, 'save')
        .mockReturnValue(Promise.resolve(mockLoja));

      const response = await service.update(1, updateLojaDto);

      expect(response).toEqual(mockLoja);
      expect(spyRepositoryFindOne).toHaveBeenCalled();
      expect(spyRepositorySave).toHaveBeenCalledWith(mockLoja);
    });

    it('exceção - ids diferentes', async () => {
      const updateLojaDto: UpdateLojaDto = {
        id: 1,
        descricao: 'Loja 01',
      };

      try {
        await service.update(2, updateLojaDto);
      } catch (error: any) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toBe(EMensagem.IDS_DIFERENTES);
      }
    });

    it('exceção - loja não existe', async () => {
      const updateLojaDto: UpdateLojaDto = {
        id: 1,
        descricao: 'Loja 01',
      };

      const spyRepositoryFindOne = jest
        .spyOn(repository, 'findOne')
        .mockReturnValue(Promise.resolve(null));

      try {
        await service.update(1, updateLojaDto);
      } catch (error: any) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toBe(EMensagem.IMPOSSIVEL_ALTERAR);
        expect(spyRepositoryFindOne).toHaveBeenCalled();
      }
    });
  });

  describe('remove', () => {
    it('deletar uma loja', async () => {
      const mockLoja: Loja = {
        id: 1,
        descricao: 'Loja 01',
        produtoloja: [],
      };

      const spyRepositoryFindOne = jest
        .spyOn(repository, 'findOne')
        .mockReturnValue(Promise.resolve(mockLoja));

      const spyRepositoryDelete = jest
        .spyOn(repository, 'delete')
        .mockReturnValue(Promise.resolve(mockLoja) as any);

      const spyRepositoryProdutoLojaDelete = jest
        .spyOn(repositoryProdutoLoja, 'delete')
        .mockReturnValue(Promise.resolve({ idLoja: mockLoja.id }) as any);

      const response = await service.remove(1);

      expect(response).toEqual(true);
      expect(spyRepositoryFindOne).toHaveBeenCalledWith({
        where: { id: mockLoja.id },
      });
      expect(spyRepositoryProdutoLojaDelete).toHaveBeenCalledWith({
        idLoja: mockLoja.id,
      });
      expect(spyRepositoryDelete).toHaveBeenCalledWith(mockLoja.id);
    });

    it('exceção - loja não encontrada', async () => {
      const mockLoja: Loja = {
        id: 1,
        descricao: 'Loja 01',
        produtoloja: [],
      };

      const spyRepositoryFindOne = jest
        .spyOn(repository, 'findOne')
        .mockReturnValue(Promise.resolve(null));

      try {
        await service.remove(1);
      } catch (error: any) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toBe(EMensagem.IMPOSSIVEL_REMOVER);
        expect(spyRepositoryFindOne).toHaveBeenCalledWith({
          where: { id: mockLoja.id },
        });
      }
    });
  });
});
