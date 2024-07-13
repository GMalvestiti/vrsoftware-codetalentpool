import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { EMensagem } from '../enums/mensagem.enum';
import { IFindAllFilter } from '../interfaces/find-all.interface';

@Injectable()
export class FindAllFilterPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: any, metadata: ArgumentMetadata) {
    try {
      if (value) {
        return JSON.parse(value as unknown as string) as
          | IFindAllFilter
          | IFindAllFilter[];
      }
    } catch (error) {
      throw new Error(EMensagem.FILTER_INVALIDO);
    }
  }
}
