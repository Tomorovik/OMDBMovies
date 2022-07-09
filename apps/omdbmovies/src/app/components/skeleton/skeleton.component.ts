import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
  selector: "omdbmovies-skeleton",
  templateUrl: "./skeleton.component.html",
  styleUrls: ["./skeleton.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonComponent {
  @Input() public itemsAmount: number[] = Array(10);
}
