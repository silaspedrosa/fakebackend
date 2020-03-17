import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-meetings-title",
  templateUrl: "./meetings-title.component.html",
  styleUrls: ["./meetings-title.component.scss"]
})
export class MeetingsTitleComponent {
  @Output() openForm = new EventEmitter();
}
