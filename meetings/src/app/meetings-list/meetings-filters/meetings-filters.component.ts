import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { MeetingQuery } from "src/app/data/models";

@Component({
  selector: "app-meetings-filters",
  templateUrl: "./meetings-filters.component.html",
  styleUrls: ["./meetings-filters.component.scss"]
})
export class MeetingsFiltersComponent {
  @Input() meetingQuery: MeetingQuery;
  @Output() submit = new EventEmitter();
}
