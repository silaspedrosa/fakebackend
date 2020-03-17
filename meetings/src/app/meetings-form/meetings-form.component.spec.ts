import { HttpClient, HttpClientModule } from "@angular/common/http";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { NgbActiveModal, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MeetingService } from "../data/api/meeting.service";
import { MeetingsFormComponent } from "./meetings-form.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

describe("MeetingsFormComponent", () => {
  let component: MeetingsFormComponent;
  let fixture: ComponentFixture<MeetingsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MeetingsFormComponent],
      imports: [HttpClientModule, NgbModule, FormsModule, ReactiveFormsModule],
      providers: [MeetingService, HttpClient, NgbActiveModal]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
