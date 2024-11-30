export class PaginationHelper {

  getTotalNumberOfPages(count: number, limit: any): number {
    let totalPages = 0
    if (count) {
      totalPages = (limit && Math.ceil(count / limit)) || 1
    }
    return totalPages
  }

  getHasMore(skip: any, dataLength: any, count: any): boolean {
    let hasMore = false
    if (skip !== undefined && skip !== null) {
      hasMore = (skip + dataLength) < count
    }
    return hasMore
  }

  getPaginationResponse<users>({ page = 1, count = 0, limit = 10, skip = 0, data = [], data_field = 'data', message = '', searchString = '' }:
    { page?: number, count?: number, limit?: number, skip?: number, data?: users[], data_field?: string, message?: string, searchString?: string }): Object {
    const hasMore = this.getHasMore(skip, data.length, count)
    const totalPages = this.getTotalNumberOfPages(count, limit)
    page = Number(page);
    return {
      has_more: hasMore,
      total: count,
      page,
      limit: limit || 0,
      total_pages: totalPages,
      success: true,
      status: 200,
      message,
      search_string: searchString,
      [data_field]: data
    }
  }
}

