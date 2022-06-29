import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HeaderComponent } from "../components/header/header/header.component";
import { MovieDetailsComponent } from "../components/movie-details/movie-details.component";
import { MovieListComponent } from "../components/movies-list/movies-list.component";
import { MoviesRoutingModule } from "./movies-routing.module";

@NgModule({
    declarations:[MovieListComponent, MovieDetailsComponent, HeaderComponent],
    imports: [
        CommonModule,
        MoviesRoutingModule
    ],
    providers: [
    ]
})
export class MoviesModule { }
