import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainPageComponent, MovieDetailsComponent } from "../components";

const routes: Routes = [
    {
        path: "",
        component: MainPageComponent
    },
    {
        path: ":id",
        component: MovieDetailsComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ],
    providers: []
})
export class MoviesRoutingModule {
}
