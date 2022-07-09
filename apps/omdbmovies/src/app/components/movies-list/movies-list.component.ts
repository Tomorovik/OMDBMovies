import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "omdbmovies-movies-list",
  templateUrl: "./movies-list.component.html",
  styleUrls: ["./movies-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieListComponent {
  @Input() public moviesList!: any;

  constructor(private readonly router: Router) {
  }

  public navigateToDetails(imdbId: string): void {
    this.router.navigate(["/movies", imdbId]);

  }
}
