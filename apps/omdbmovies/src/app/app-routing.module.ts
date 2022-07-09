import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MaintenanceComponent } from "./components/maintenance/maintenance.component";


const routes: Routes = [
  {
    path: "movies",
    loadChildren: () =>
      import("./modules/movies.module").then(
        (m) => m.MoviesModule
      )
  },
  {
    path: "maintenance",
    component: MaintenanceComponent,
  },
  {
    path: "**",
    redirectTo: "movies",
    pathMatch: "full",
  },
  {
    path: "",
    redirectTo: "movies",
    pathMatch: "full",
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false, scrollPositionRestoration: "enabled" })],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule { }
