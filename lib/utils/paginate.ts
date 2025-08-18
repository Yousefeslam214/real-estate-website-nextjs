export interface PaginationResult<T> {
  data: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

export function paginate<T>(
  items: T[],
  page: number,
  limit: number
): PaginationResult<T> {
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedData = items.slice(startIndex, endIndex);

  return {
    data: paginatedData,
    currentPage: page,
    totalPages,
    totalItems,
  };
}
