import { HttpClient, HttpClientModule } from "@angular/common/http";
import { async, ComponentFixture, TestBed, tick } from "@angular/core/testing";
import { NgbModal, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { makeServer } from "src/server/server";
import { MeetingService } from "../data/api/meeting.service";
import { MeetingsListComponent } from "./meetings-list.component";
import { Success, RemoteData } from "../data/utils";
import { of } from "rxjs";
import { delay } from "rxjs/operators";
import { MeetingsTitleComponent } from "./meetings-title/meetings-title.component";
import { MeetingsTableComponent } from "./meetings-table/meetings-table.component";
import { MeetingsFiltersComponent } from "./meetings-filters/meetings-filters.component";

describe("MeetingsListComponent", () => {
  let component: MeetingsListComponent;
  let fixture: ComponentFixture<MeetingsListComponent>;
  let element: HTMLElement;
  let server;

  function setupComponent() {
    fixture = TestBed.createComponent(MeetingsListComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  }

  async function remoteDataToResolution(
    getter: () => RemoteData
  ): Promise<void> {
    while (!getter()?.isSuccess && !getter()?.isFailure) {
      await of()
        .pipe(delay(10))
        .toPromise();
    }
  }

  function expectResultLength(result: RemoteData) {
    expect(result.isSuccess).toBeTruthy();
    return expect(result.data.length);
  }

  function expectTableRowsCountToBe(count: number) {
    const rows = fixture.nativeElement.querySelectorAll("tbody tr");
    expect(rows.length).toEqual(count);
  }

  beforeEach(async(() => {
    server = makeServer("test");
    TestBed.configureTestingModule({
      declarations: [
        MeetingsListComponent,
        MeetingsTitleComponent,
        MeetingsTableComponent,
        MeetingsFiltersComponent
      ],
      imports: [HttpClientModule, NgbModule],
      providers: [MeetingService, HttpClient, NgbModal]
    }).compileComponents();
  }));

  afterEach(() => {
    server.shutdown();
  });

  it("should create", () => {
    setupComponent();

    expect(component).toBeTruthy();
    const title = element.querySelector("h1");
    expect(title.textContent).toEqual("Meetings");
  });

  fit("should show only 10 items per page", async () => {
    server.createList("meeting", 15);
    setupComponent();

    await remoteDataToResolution(() => component.meetings);

    expectResultLength(component.meetings).toEqual(10);
    fixture.detectChanges();

    expectTableRowsCountToBe(10);
  });

  fit("should show a message when there is no page", async () => {
    setupComponent();

    await remoteDataToResolution(() => component.meetings);

    expectResultLength(component.meetings).toEqual(0);
    fixture.detectChanges();

    expectTableRowsCountToBe(1);

    const msg = element.querySelector("table h1");
    expect(msg.textContent).toEqual("No meetings found");
  });
});
