type PaginationParams = {
  page?: number
  limit?: number
}

type PaginationResult<T> = {
  data: T[]
  total: number
  page: number
  limit: number
}

export const paginate = async <T>(
  findManyFn: (args: object) => Promise<T[]>,
  countFn: () => Promise<number>,
  params: PaginationParams,
  options: object = {}
): Promise<PaginationResult<T>> => {
  const page = params.page || 1
  const limit = params.limit || 10
  const skip = (page - 1) * limit

  const [data, total] = await Promise.all([
    findManyFn({ skip, take: limit, ...options }), 
    countFn(),
  ])

  return {
    data,
    total,
    page,
    limit,
  }
}

