import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  verify(): string {
    return 'OK';
  }
}
