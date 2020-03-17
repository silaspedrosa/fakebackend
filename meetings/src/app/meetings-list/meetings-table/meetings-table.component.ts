import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { RemoteData } from "src/app/data/utils";
import { Meeting } from "src/app/data/models";

@Component({
  selector: "app-meetings-table",
  templateUrl: "./meetings-table.component.html",
  styleUrls: ["./meetings-table.component.scss"]
})
export class MeetingsTableComponent {
  @Input() meetings: RemoteData<Meeting[]>;
  @Output() meetingClick = new EventEmitter<Meeting>();
}
