import { fakerPT_BR as faker } from '@faker-js/faker';
import { define } from 'typeorm-seeding';
import { CreateProdutoDto } from '../../core/produto/dto/create-produto.dto';
import { Produto } from '../../core/produto/entities/produto.entity';

define(Produto, () => {
  const produto = new CreateProdutoDto();

  produto.descricao = faker.commerce.productName();
  produto.custo = faker.number.float({ min: 1, max: 1000, precision: 3 });
  produto.imagem = null;

  return new Produto(produto);
});
