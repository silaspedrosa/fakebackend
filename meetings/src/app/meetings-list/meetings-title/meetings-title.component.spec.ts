import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingsTitleComponent } from './meetings-title.component';

describe('MeetingsTitleComponent', () => {
  let component: MeetingsTitleComponent;
  let fixture: ComponentFixture<MeetingsTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingsTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingsTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
