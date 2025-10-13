import type { db } from "../db/configuration.js";

export type DBTable = any;

export type DBTableRow = any | any[];

export type DBNewRecord = any;

export type DBNewRecords = any;

export type SortDirection = "asc" | "desc";

export type DBTableColumns<T extends DBTableRow> = keyof T;

export interface WhereQueryData<T extends DBTableRow> {
  columns: Array<keyof T>;
  values: any[];
}

export interface OrderByQueryData<T extends DBTableRow> {
  columns: Array<DBTableColumns<T>>;
  values: SortDirection[];
}

export interface InQueryData<T extends DBTableRow> {
  key: keyof T;
  values: any[];
}

export type UpdateRecordData<R extends DBTableRow> = Partial<
  Omit<R, "id" | "created_at" | "updated_at">
>;

export interface PaginationInfo {
  total_records: number;
  total_pages: number;
  page_size: number;
  current_page: number;
  next_page: number | null;
  prev_page: number | null;
}

export interface PaginatedRecords<T extends DBTableRow> {
  pagination_info: PaginationInfo;
  records: T[];
}

export type Transaction = Parameters<Parameters<typeof db.transaction>[0]>[0];
