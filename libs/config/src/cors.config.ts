import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

const CLIENT_URL_DEFAULT = 'http://localhost:3001';

export const corsConfig: CorsOptions = {
  origin: [process.env.CLIENT_URL || CLIENT_URL_DEFAULT],
};
