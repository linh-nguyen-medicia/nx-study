import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../models/user';


@Controller('api')
export class UsersController {
  constructor(protected readonly _userService: UsersService) {}

  @Get('users')
  public getUsers(): { items: User[]; totalRecords: number } {
    return this._userService.getUsers();
  }
}
