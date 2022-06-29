import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MovieDetailsComponent } from "../components/movie-details/movie-details.component";
import { MovieListComponent } from "../components/movies-list/movies-list.component";

const routes: Routes = [
    {
        path: "",
        component: MovieListComponent
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
