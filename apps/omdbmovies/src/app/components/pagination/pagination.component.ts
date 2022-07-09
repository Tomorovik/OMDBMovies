import { Component, Input, ViewChild } from "@angular/core";
import { Paginator } from "primeng/paginator";
import { skip } from "rxjs";
import { FilterEventService } from "../../services";

@Component({
  selector: "omdbmovies-pagination",
  templateUrl: "./pagination.component.html",
  styleUrls: ["./pagination.component.scss"]
})
export class PaginationComponent {
  @Input() public itemsAmount = 0;
  @Input() public activePage = 0;

  @ViewChild("paginator", { static: false }) public paginator!: Paginator;

  private prevPage = 0;
  constructor(
    private filterEventService: FilterEventService) {
    this.filterEventService.pageResetEvent$.pipe(skip(1))
      .subscribe(() => {
        this.paginator.changePageToFirst(new Event("click"));
      });

  }
  public paginate(event: any): void {
    if (this.prevPage === event.page)
      return;
    else {
      this.scroll(event);
      this.prevPage = event.page;
      this.filterEventService.setPage(event.page + 1);
    }
  }

  private scroll(event: any): void {
    if (this.prevPage !== event.page) {
      window.scroll({ top: 0, behavior: "smooth" });
    }
  }

}
