import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  getHello(): string {
    this.logger.log('Handling a call');
    return 'DebTaz42 - Are plants pets? Coming soon...';
  }
}
