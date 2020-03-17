import { Component, OnInit } from "@angular/core";
import { Meeting, MeetingQuery } from "../data/models";
import { RemoteData, InProgress } from "../data/utils";
import { MeetingService } from "../data/api/meeting.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { MeetingsFormComponent } from "../meetings-form/meetings-form.component";
import { SubjectsListComponent } from "../subjects-list/subjects-list.component";

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

  constructor(
    private readonly meetingService: MeetingService,
    private readonly ngbModal: NgbModal
  ) {}

  async ngOnInit() {
    await this.fetchData();
  }

  async fetchData() {
    this.meetings = new InProgress();
    this.meetings = await this.meetingService.getAll(this.meetingQuery);
  }

  async submitFilters() {
    this.meetingQuery.page = 1;
    await this.fetchData();
  }

  async changePage(page: number) {
    this.meetingQuery.page = page;
    await this.fetchData();
  }

  async openForm() {
    const ref = this.ngbModal.open(MeetingsFormComponent);
    try {
      const result = await ref.result;
      if (result != null) {
        this.meetingQuery.page = 1;
        await this.fetchData();
      }
    } catch (error) {}
  }

  async onMeetingClick(meeting: Meeting) {
    try {
      const ref = this.ngbModal.open(SubjectsListComponent);
      ref.componentInstance.meeting = meeting;
      await ref.result;
    } catch (error) {}
  }
}
