import { Factory, Seeder } from 'typeorm-seeding';
import { Loja } from '../core/loja/entities/loja.entity';

export class LojaSeed implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(Loja)().createMany(3);
  }
}