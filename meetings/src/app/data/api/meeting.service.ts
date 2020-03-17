import { Injectable } from "@angular/core";
import { MeetingQuery, Meeting, toHttpParams } from "../models";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Success, RemoteData, Failure } from "../utils";
import { of } from "rxjs";
import { delay } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class MeetingService {
  constructor(private readonly http: HttpClient) {}

  async getAll(
    query: Partial<MeetingQuery> = {}
  ): Promise<RemoteData<Meeting[]>> {
    console.log("received query", query);
    // return new Failure(new HttpErrorResponse({status: 400}));
    try {
      // const result = await of([
      //   {
      //     id: 1,
      //     date: "2020-03-04",
      //     meetingCount: 5,
      //     status: "open"
      //   } as Meeting
      // ])
      //   .pipe(delay(2000))
      //   .toPromise();
      const result = await this.http
        .get<{ meetings: Meeting[] }>(`${environment.apiUrl}/api/meetings`, {
          params: toHttpParams(query)
        })
        .toPromise();
      console.log(result);
      return new Success<Meeting[]>(result.meetings);
    } catch (error) {
      return new Failure(error);
    }
  }

  async create(model: any): Promise<RemoteData<Meeting>> {
    try {
      const result = await this.http
        .post<{ meeting: Meeting }>(`${environment.apiUrl}/api/meetings`, {
          meeting: model
        })
        .toPromise();
      return new Success<Meeting>(result.meeting);
    } catch (error) {
      return new Failure(error);
    }
  }
}
