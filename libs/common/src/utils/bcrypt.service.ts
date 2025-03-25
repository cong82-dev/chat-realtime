import { Injectable, OnModuleInit } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService implements OnModuleInit {
  private salt: string;

  async onModuleInit() {
    this.salt = await bcrypt.genSalt(10);
  }

  async hashValue(text: string): Promise<string> {
    return bcrypt.hash(text, this.salt);
  }

  async compareHash(text: string, hashText: string): Promise<boolean> {
    return bcrypt.compare(text, hashText);
  }
}
