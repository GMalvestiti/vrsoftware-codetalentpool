import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { EMensagem } from '../enums/mensagem.enum';
import { IFindAllOrder } from '../interfaces/find-all.interface';

@Injectable()
export class FindAllOrderPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: any, metadata: ArgumentMetadata) {
    try {
      if (value) {
        return JSON.parse(value as unknown as string) as IFindAllOrder;
      }
    } catch (error) {
      throw new Error(EMensagem.ORDER_INVALIDO);
    }
  }
}
