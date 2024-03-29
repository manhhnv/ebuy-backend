import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserAuth {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  valiatePassword(
    clientPassword: string,
    storedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(clientPassword, storedPassword);
  }
  hashPassword(clientPassword: string): Promise<string> {
    return bcrypt.hash(clientPassword, 10);
  }
}
