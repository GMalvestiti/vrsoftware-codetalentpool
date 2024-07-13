import { EMensagem } from '../enums/mensagem.enum';
import { IResponse } from '../interfaces/response.interface';
import { ResponseData, ResponseMessage } from '../types/response.types';

export class HttpResponse<T> implements IResponse<T> {
  message: ResponseMessage = '';
  data: ResponseData<T>;
  count!: number;

  constructor(data: ResponseData<T>, message?: '', count?: number) {
    this.message = message;
    this.data = data;
    this.count = count;
  }

  onSuccess(message: string): IResponse<T> {
    this.message = message;
    return this;
  }

  onCreated(): IResponse<T> {
    this.message = EMensagem.SALVO_SUCESSO;
    return this;
  }

  onUpdate(): IResponse<T> {
    this.message = EMensagem.ATUALIZADO_SUCESSO;
    return this;
  }

  onDeleted(): IResponse<T> {
    this.message = EMensagem.EXCLUIDO_SUCESSO;
    return this;
  }
}
