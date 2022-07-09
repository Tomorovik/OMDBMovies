import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { delay, switchMap, tap } from "rxjs";
import { MoviesService } from "../../services";

@Component({
  selector: "omdbmovies-movie-details",
  templateUrl: "./movie-details.component.html",
  styleUrls: ["./movie-details.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieDetailsComponent {
  public movieDetails: any;
  public isLoading: any;
  constructor(
    private movieService: MoviesService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef) {
    this.route.params
      .pipe(
        switchMap((x => {
          this.isLoading = true;
          const imdbId = this.route.snapshot.paramMap.get("id");
          return this.movieService.getMovie({ i: imdbId });
        })),
        delay(1000),
        tap(x => {
          this.movieDetails = x;
          this.isLoading = false;
          this.cd.markForCheck();
        })
      )
      .subscribe();
  }
}
