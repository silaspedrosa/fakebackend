import { HttpParams } from "@angular/common/http";

export interface Meeting {
  id: number;
  date: string;
  meetingCount: number;
  status: string;
}

export interface Subject {
  id: number;
  description: string;
  decision: string;
  meetingId: number;
}

function toHttpParams(obj: any): HttpParams {
  let params = new HttpParams();
  Object.entries(obj).forEach(([key, value]) => {
    if (value != null) {
      if (typeof value === "string") params.set(key, value);
      else if (typeof value === "number") params.set(key, value.toString());
    }
  });
  return params;
}

export interface BaseQuery {
  page: number;
  pageSize: number;
  search: string;
}

export interface MeetingQuery extends BaseQuery {
  status: string;
}

export interface SubjectQuery extends BaseQuery {}
