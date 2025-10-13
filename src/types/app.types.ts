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

export interface emailOptions {
  to: string | null;
  cc?: any;
  subject: string;
  user_name?: string;
  login_link?: string;
  view_case_link?: string;
}

export interface JwtUserPayload {
  sub: number;
  iat: number;
}

export interface ScrapingData {
  company_name: string;
  company_description: string;
  data: string;
  page_title: string;
}

export interface EmailOtpData {
  action: string;
  otp: string;
  expires_at: Date;
  email: string | null;
}
export interface PhoneOtpData {
  action: string;
  otp: string;
  expires_at: Date;
  phone: string | null;
}

export interface UserDetails {
  id: number;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
}

export interface RefreshTokenData {
  access_token: string;
  refresh_token: string;
  refresh_token_expires_at: number;
}
