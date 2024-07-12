import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async verify(): Promise<string> {
    return 'OK';
  }
}
