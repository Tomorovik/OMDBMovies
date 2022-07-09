import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { delay, filter, Observable, of, skip, switchMap, tap } from 'rxjs';
import { FilterData } from '../../models/filter-data.model';
import { Search } from '../../models/search.model';
import { FilterEventService } from '../../services/event/filter-event.service';
import { MoviesService } from '../../services/movies.service';

export type Layout = "loading" | "emptyPhrase" | "movieList" | "noResults" | "tooManyResults";

@Component({
  selector: 'omdbmovies-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
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
          this.activeLayout = "emptyPhrase"
          return of(null);
        }
        // const pagination = `${filterData.pagination.pageNo * filterData.pagination.pageSize}-${(filterData.pagination.pageNo + 1) * filterData.pagination.pageSize}`
        const { title, type, page, year } = filterData;


        const searchData: Search = {};
        if (title)
          searchData.s = title
        if (type)
          searchData.type = type
        if (page)
          searchData.page = page
        if (year)
          searchData.y = year
        // const mappedData = { s: filterData.title, y: filterData.year, type: filterData.type, page: 1 };
        console.log(searchData)
        return this.moviesService.getMovies<any>(searchData);
      }),
      delay(0)
    ).subscribe(x => {
      this.setLayoutAndData(x);
      this.cd.markForCheck();
    });
  }


  private setLayoutAndData(x: any) {
    if (!x) {
      this.activeLayout = "emptyPhrase";
    }
    else if (x.Response.toLowerCase() === "false") {
      if (x.Error.includes("not found"))
        this.activeLayout = "noResults";
      else
        this.activeLayout = "tooManyResults";
    }
    else {
      this.activeLayout = "movieList";
      this.moviesList = x;
    }
  }
}
