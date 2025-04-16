import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validateSync, ValidationError } from 'class-validator';

export function validateEnvUtil<T>(config: Record<string, unknown>, envVariablesClass: ClassConstructor<T>): T {
  const validatedConfig = plainToInstance(envVariablesClass, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig as unknown as object, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    const errorMessages = errors.map((error) => error.toString()).join('\n');
    throw new Error(errorMessages);
  }

  return validatedConfig;
}
export function formatErrorPipeUtil(errors: ValidationError[]) {
  return errors
    .map((error) => ({
      field: error.property,
      message: getMessage(error),
    }))
    .filter((error) => error.message);

  function getMessage(error: ValidationError): string {
    if (error.constraints) {
      return Object.values(error.constraints)[0];
    }

    if (error.children && error.children.length) {
      return error.children.map((child) => getMessage(child)).join(', ');
    }

    return 'Validation failed';
  }
}
