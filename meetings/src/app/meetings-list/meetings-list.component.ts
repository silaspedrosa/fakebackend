import { Component, OnInit } from "@angular/core";
import { Meeting, MeetingQuery } from "../data/models";
import { RemoteData, InProgress } from "../data/utils";
import { MeetingService } from "../data/api/meeting.service";

@Component({
  selector: "app-meetings-list",
  templateUrl: "./meetings-list.component.html",
  styleUrls: ["./meetings-list.component.scss"]
})
export class MeetingsListComponent implements OnInit {
  meetings: RemoteData<Meeting[]>;
  meetingQuery: Partial<MeetingQuery> = {
    page: 1,
    pageSize: 10,
    status: "All"
  };

  constructor(private readonly meetingService: MeetingService) {}

  async ngOnInit() {
    await this.fetchData();
  }

  async fetchData() {
    this.meetings = new InProgress();
    this.meetings = await this.meetingService.getAll(this.meetingQuery);
  }

  async changePage(page: number) {
    console.log("changePage", page);
    this.meetingQuery.page = page;
    await this.fetchData();
  }
}
