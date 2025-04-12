import { IPagination } from '../interfaces';

export function getPaginationParams(page: number, take: number): Omit<IPagination, 'orderBy'> & { skip: number } {
  const skip = (page - 1) * take;
  return {
    skip,
    take,
    page,
  };
}
