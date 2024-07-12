import { ResponseData, ResponseMessage } from '../types/response.types';

export interface IResponse<T> {
  message: ResponseMessage;
  data: ResponseData<T>;
}
