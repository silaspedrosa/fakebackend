import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MeetingsListComponent } from "./meetings-list/meetings-list.component";

const routes: Routes = [{ path: "", component: MeetingsListComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
