import { Component, OnInit, Input } from "@angular/core";
import { Meeting } from "../data/models";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-subjects-list",
  templateUrl: "./subjects-list.component.html",
  styleUrls: ["./subjects-list.component.scss"]
})
export class SubjectsListComponent {
  @Input() meeting: Meeting;
  constructor(private readonly modal: NgbActiveModal) {}

  dismiss() {
    this.modal.dismiss();
  }
}
