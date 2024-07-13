import { fakerPT_BR as faker } from '@faker-js/faker';
import { define } from 'typeorm-seeding';
import { CreateLojaDto } from '../../core/loja/dto/create-loja.dto';
import { Loja } from '../../core/loja/entities/loja.entity';

define(Loja, () => {
  const loja = new CreateLojaDto();

  loja.descricao = faker.company.name();

  return new Loja(loja);
});
