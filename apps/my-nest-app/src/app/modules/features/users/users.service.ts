import { Injectable } from '@nestjs/common';
import { User } from '../../../models/user';

@Injectable()
export class UsersService {

  listUsers(): { items: User[], totalRecords: number } {
    const users: User[] = [
      { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' }
    ];

    return {
      items: users,
      totalRecords: users.length
    };
  }
}
