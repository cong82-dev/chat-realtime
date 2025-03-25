import { Module } from '@nestjs/common';
import { BcryptService } from './bcrypt.service';

const services = [BcryptService];
const providers = [BcryptService];
@Module({
  providers: [...providers],
  exports: [...services],
})
export class UntilModule {}
