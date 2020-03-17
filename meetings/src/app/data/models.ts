import { HttpParams } from "@angular/common/http";

export interface Meeting {
  id: number;
  date: string;
  subjectCount: number;
  status: string;
  description: string;
}

export interface Subject {
  id: number;
  title: string;
  meetingId: number;
}

export function toHttpParams(obj: any): HttpParams {
  let params = new HttpParams();
  Object.entries(obj).forEach(([key, value]) => {
    if (value != null) {
      if (typeof value === "string") params = params.set(key, value);
      else if (typeof value === "number")
        params = params.set(key, value.toString());
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
