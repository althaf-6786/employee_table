import type { DBTableRow, PaginationInfo } from "./db.types.js";

export type ActionType = string;

export interface PaginatedResp<T extends DBTableRow> {
  pagination_info: PaginationInfo;
  records: T[];
}
export type AppRespData = any | any[];
export interface SuccessResp {
  status: number;
  success: true;
  message: string;
  data?: AppRespData;
}
export type ValidatedRequest = any;

export type AppActivity = any;
