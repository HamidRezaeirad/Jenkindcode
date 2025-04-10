import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getVersion(): Record<string, string> {
    return { Version: '1.0.0' };
  }
}
