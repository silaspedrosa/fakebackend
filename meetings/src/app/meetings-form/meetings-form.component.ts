import { Component, OnInit } from "@angular/core";
import { MeetingService } from "../data/api/meeting.service";
import { Meeting } from "../data/models";
import { RemoteData, InProgress, Success, Failure } from "../data/utils";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-meetings-form",
  templateUrl: "./meetings-form.component.html",
  styleUrls: ["./meetings-form.component.scss"]
})
export class MeetingsFormComponent implements OnInit {
  model: { year: number; month: number; day: number } = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate()
  };
  request: RemoteData<Meeting>;
  error: string;

  constructor(
    private readonly meetingService: MeetingService,
    private readonly modal: NgbActiveModal
  ) {}

  ngOnInit(): void {}

  async submit() {
    this.error = null;
    this.request = new InProgress();
    const result = await this.meetingService.create(this.model);
    if (result instanceof Success) {
      this.modal.close(result.data);
    } else if (result instanceof Failure) {
      this.error = result.error.message;
      this.request = null;
    }
  }

  dismiss() {
    this.modal.dismiss();
  }
}
