import { Injectable } from "@angular/core";
import { MeetingQuery, Meeting } from "../models";
import { HttpClient } from "@angular/common/http";
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
    try {
      const result = await of([
        {
          id: 1,
          date: "2020-03-04",
          meetingCount: 5,
          status: "open"
        } as Meeting
      ])
        .pipe(delay(2000))
        .toPromise();
      // const result = await this.http
      //   .get<Meeting[]>(`${environment.apiUrl}/meetings`, {
      //     params: query.toHttpParams()
      //   })
      //   .toPromise();
      return new Success<Meeting[]>(result);
    } catch (error) {
      return new Failure(error);
    }
  }
}
