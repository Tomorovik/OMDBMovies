import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { FilterData } from '../../models/filter-data.model';
import { FilterEventService } from '../../services/event/filter-event.service';

@Component({
  selector: 'omdbmovies-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent implements OnDestroy {
  public types: string[] = [
    'movie',
    'series',
    'episode'
  ];

  public form!: FormGroup;

  private destroy$: Subject<null> = new Subject<null>();

  constructor(
    private filterEventService: FilterEventService,
    private formBuilder: FormBuilder) {
    this.createForm();
    this.setSubscriptions();
  }

  private setSubscriptions() {
    this.form.valueChanges.pipe(debounceTime(500),
      distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.resetPage();
      this.handleFilters();
    });

    this.filterEventService.pageChangeEvent$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(x => {
      this.handleFilters(x);
    }
    );
  }

  private resetPage(): void {
    this.filterEventService.resetPage();
  }
  private handleFilters(x ?: number) {
    const filterData: FilterData = this.getFormData();
    filterData.page = x ?? 1;
    this.filterEventService.setFilterData(filterData);
  }

  private getFormData(): FilterData {
    return {
      title: this.form.controls['title'].value ?? null,
      year: (this.form.controls['year'].value ? new Date(this.form.controls['year'].value).getFullYear().toString() : null),
      type: this.form.controls['type'].value ? this.form.controls['type'].value?.join(",") : null
    };
  }

  private createForm() {
    this.form = this.formBuilder.group({
      title: new FormControl(null),
      year: new FormControl(null),
      type: new FormControl(null)
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  public clear(): void {
    this.form.reset();
  }

  public clearInput(): void {
    this.form.controls['title'].patchValue(null);
  }
}
