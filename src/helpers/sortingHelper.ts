export class SortingHelper {
  sortData(data: any[], sortColumn: string, sortOrder: string) {
    const sortedData = [...data].sort((a: any, b: any) => {
      const valueA = a[sortColumn];
      const valueB = b[sortColumn];

      if (typeof valueA === "string" && typeof valueB === "string") {
        // Perform case-sensitive sorting for strings
        if (sortOrder === "asc") {
          return valueA.localeCompare(valueB);
        } else if (sortOrder === "desc") {
          return valueB.localeCompare(valueA);
        }
      } else {
        // For non-string fields
        if (sortOrder === "asc") {
          return valueA > valueB ? 1 : -1;
        } else if (sortOrder === "desc") {
          return valueA < valueB ? 1 : -1;
        }
      }

      return 0;
    });
    return sortedData;
  }
}
