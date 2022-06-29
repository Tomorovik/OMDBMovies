import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'omdbmovies-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieListComponent  {

  
}
