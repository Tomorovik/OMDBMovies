import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FilterData } from '../../models/filter-data.model';

export type FilterDataMap = Map<string, string>;

@Injectable({
  providedIn: 'root'
})
export class FilterEventService {

  public filter$: BehaviorSubject<FilterData> = new BehaviorSubject<FilterData>({} as FilterData);
  // public filter$: BehaviorSubject<FilterDataMap> = new BehaviorSubject<FilterDataMap>({} as FilterDataMap);
  public pageChangeEvent$: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  public pageResetEvent$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public setFilterData(filterData: FilterData): void {
    this.filter$.next(filterData);
  }

  public setPage(page: number): void {
    this.pageChangeEvent$.next(page);
  }

  public resetPage(): void {
    this.pageResetEvent$.next(true);

  }
}

