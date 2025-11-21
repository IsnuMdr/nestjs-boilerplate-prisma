import { Injectable } from '@nestjs/common';
import { PaginatedResult } from './pagination.types';

@Injectable()
export class PaginationService {
  /**
   * Paginate Prisma query results
   * @param model - Prisma model delegate (e.g., prisma.user)
   * @param params - Query parameters including where, orderBy, page, perPage, etc.
   * @returns Paginated result with data and metadata
   */
  async paginate<T>(
    model: any,
    params: {
      where?: any;
      orderBy?: any;
      page?: number;
      perPage?: number;
      select?: any;
      include?: any;
    },
  ): Promise<PaginatedResult<T>> {
    const page = params.page || 1;
    const perPage = params.perPage || 10;
    const skip = (page - 1) * perPage;

    // Parallel execution for better performance
    const [data, total] = await Promise.all([
      model.findMany({
        where: params.where,
        orderBy: params.orderBy,
        select: params.select,
        include: params.include,
        skip,
        take: perPage,
      }),
      model.count({ where: params.where }),
    ]);

    const lastPage = Math.ceil(total / perPage) || 1;

    return {
      data,
      meta: {
        total,
        lastPage,
        currentPage: page,
        perPage,
        prev: page > 1 ? page - 1 : null,
        next: page < lastPage ? page + 1 : null,
      },
    };
  }
}
