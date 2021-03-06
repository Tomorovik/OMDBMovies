import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { InputTextModule } from "primeng/inputtext";
import { CalendarModule } from "primeng/calendar";
import { ButtonModule } from "primeng/button";
import { SkeletonModule } from "primeng/skeleton";
import { MultiSelectModule } from "primeng/multiselect";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PaginatorModule } from "primeng/paginator";
import { FiltersComponent } from "../components/filters/filters.component";
import { MovieListComponent } from "../components/movies-list/movies-list.component";
import { MovieDetailsComponent } from "../components/movie-details/movie-details.component";
import { MainPageComponent } from "../components/main-page/main-page.component";
import { PaginationComponent } from "../components/pagination/pagination.component";
import { PosterValidationPipe } from "../pipes/poster-validation.pipe";
import { SkeletonComponent } from "../components/skeleton/skeleton.component";
import { MoviesRoutingModule } from "./movies-routing.module";

@NgModule({
    declarations: [
        SkeletonComponent,
        PosterValidationPipe,
        PaginationComponent,
        MainPageComponent,
        FiltersComponent,
        MovieListComponent,
        MovieDetailsComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PaginatorModule,
        MoviesRoutingModule,
        InputTextModule,
        ButtonModule,
        CalendarModule,
        MultiSelectModule,
        SkeletonModule
    ],
    providers: [
    ]
})
export class MoviesModule { }
