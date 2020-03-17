import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { MeetingService } from "../data/api/meeting.service";
import { Meeting } from "../data/models";
import { Failure, InProgress, RemoteData, Success } from "../data/utils";

@Component({
  selector: "app-meetings-form",
  templateUrl: "./meetings-form.component.html",
  styleUrls: ["./meetings-form.component.scss"]
})
export class MeetingsFormComponent implements OnInit {
  form: FormGroup;
  get subjects() {
    return this.form.get("subjects") as FormArray;
  }
  // model: {
  //   year: number;
  //   month: number;
  //   day: number;
  //   description: string;
  //   subjects: { description: string }[];
  // } = {
  //   year: new Date().getFullYear(),
  //   month: new Date().getMonth() + 1,
  //   day: new Date().getDate(),
  //   description: "",
  //   subjects: []
  // };
  request: RemoteData<Meeting>;
  error: string;

  constructor(
    private readonly meetingService: MeetingService,
    private readonly modal: NgbActiveModal,
    private readonly fb: FormBuilder
  ) {
    const now = new Date();
    this.form = this.fb.group({
      year: this.fb.control(now.getFullYear()),
      month: this.fb.control(now.getMonth() + 1),
      day: this.fb.control(now.getDate()),
      description: this.fb.control(""),
      subjects: this.fb.array([])
    });
  }

  ngOnInit(): void {}

  addSubject() {
    this.subjects.push(
      this.fb.group({
        title: this.fb.control("")
      })
    );
    console.log("subjects after push", this.subjects);
  }

  async submit() {
    this.error = null;
    this.request = new InProgress();
    console.log(this.form.value);
    this.request = await this.meetingService.create(this.form.value);
    if (this.request instanceof Success) {
      this.modal.close(this.request);
    } else if (this.request instanceof Failure) {
      console.log(this.request);
      this.error =
        this.request.error?.error?.errors[0] ||
        "Sorry, we couldn't process your action";
    }
  }

  dismiss() {
    this.modal.dismiss();
  }
}
