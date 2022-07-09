import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from "@angular/core";
import { of, skip, switchMap, tap } from "rxjs";
import { FilterData, MovieResponse, SearchRequest } from "../../models";
import { FilterEventService, MoviesService } from "../../services";

export type Layout = "loading" | "emptyPhrase" | "movieList" | "noResults" | "tooManyResults";

@Component({
  selector: "omdbmovies-main-page",
  templateUrl: "./main-page.component.html",
  styleUrls: ["./main-page.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent {
  public moviesList: any;
  public activeLayout: Layout = "loading";
  public isLoading = false;
  constructor(
    private readonly moviesService: MoviesService,
    private readonly filterEventService: FilterEventService,
    private readonly cd: ChangeDetectorRef
  ) {
    this.filterEventService.filter$.pipe(
      tap(() => {
        this.activeLayout = "loading";
        this.moviesList = {};
        this.cd.markForCheck();
      }),
      skip(1),
      switchMap((filterData: FilterData) => {
        if (!filterData.title) {
          this.activeLayout = "emptyPhrase";
          return of(null);
        }
        const searchData: SearchRequest = this.prepareRequest(filterData);
        return this.moviesService.getMovies<any>(searchData);
      })
    ).subscribe((movieResponse: MovieResponse) => {
      this.setLayoutAndData(movieResponse);
      this.cd.markForCheck();
    });
  }

  private prepareRequest(filterData: FilterData) {
    const { title, type, page, year } = filterData;
    const searchData: SearchRequest = {};
    if (title)
      searchData.s = title;
    if (type)
      searchData.type = type;
    if (page)
      searchData.page = page;
    if (year)
      searchData.y = year;
    return searchData;
  }

  private setLayoutAndData(movieResponse: MovieResponse) {
    if (!movieResponse) {
      this.activeLayout = "emptyPhrase";
    }
    else if (movieResponse.Response.toLowerCase() === "false") {
      if (movieResponse.Error.includes("not found"))
        this.activeLayout = "noResults";
      else
        this.activeLayout = "tooManyResults";
    }
    else {
      this.activeLayout = "movieList";
      this.moviesList = movieResponse;
    }
  }
}
