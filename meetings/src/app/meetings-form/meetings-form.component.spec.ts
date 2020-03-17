import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingsFormComponent } from './meetings-form.component';

describe('MeetingsFormComponent', () => {
  let component: MeetingsFormComponent;
  let fixture: ComponentFixture<MeetingsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
