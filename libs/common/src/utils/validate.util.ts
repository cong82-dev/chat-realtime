import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

export function validateEnvUtil<T>(config: Record<string, unknown>, envVariablesClass: ClassConstructor<T>): T {
  const validatedConfig = plainToInstance(envVariablesClass, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig as unknown as object, { skipMissingProperties: false });

  if (errors.length > 0) {
    const errorMessages = errors.map((error) => error.toString()).join('\n');
    throw new Error(errorMessages);
  }

  return validatedConfig;
}
