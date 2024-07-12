import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { HttpResponse } from './shared/classes/http-response';
import { IResponse } from './shared/interfaces/response.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async verify(): Promise<IResponse<string>> {
    const data = await this.appService.verify();

    return new HttpResponse(data).onSuccess('Sucesso!');
  }
}
