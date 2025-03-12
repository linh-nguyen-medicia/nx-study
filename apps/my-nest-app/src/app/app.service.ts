import { Injectable } from '@nestjs/common';
import { User } from '../models/user';

@Injectable()
export class AppService {
  getData(): { message: string } {
    return { message: 'Hello API' };
  }
}
