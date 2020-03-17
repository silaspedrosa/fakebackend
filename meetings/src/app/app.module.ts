import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MeetingsListComponent } from "./meetings-list/meetings-list.component";
import { NgbModalModule, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MeetingsFormComponent } from "./meetings-form/meetings-form.component";
import { SpinnerComponent } from "./spinner/spinner.component";
import { SubjectsListComponent } from "./subjects-list/subjects-list.component";
import { MeetingsFiltersComponent } from './meetings-list/meetings-filters/meetings-filters.component';

@NgModule({
  declarations: [
    AppComponent,
    MeetingsListComponent,
    MeetingsFormComponent,
    SpinnerComponent,
    SubjectsListComponent,
    MeetingsFiltersComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
    // NgbModalModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [MeetingsFormComponent, SubjectsListComponent]
})
export class AppModule {}
