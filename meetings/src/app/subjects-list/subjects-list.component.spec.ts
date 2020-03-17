import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SubjectsListComponent } from "./subjects-list.component";
import { NgbModule, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

describe("SubjectsListComponent", () => {
  let component: SubjectsListComponent;
  let fixture: ComponentFixture<SubjectsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SubjectsListComponent],
      imports: [NgbModule],
      providers: [NgbActiveModal]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
