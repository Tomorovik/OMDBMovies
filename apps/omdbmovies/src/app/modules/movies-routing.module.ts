import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainPageComponent } from "../components/main-page/main-page.component";
import { MovieDetailsComponent } from "../components/movie-details/movie-details.component";

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
