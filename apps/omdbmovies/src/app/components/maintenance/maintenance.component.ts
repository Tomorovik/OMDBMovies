import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { BASE_APP_SETTINGS } from '../../models/app-settings.model';
import { AppConfigService } from '../../services/app-config.service';

@Component({
  selector: 'omdbmovies-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaintenanceComponent {

  constructor(public appConfigService: AppConfigService, private router: Router) {
    this.appConfigService.appSettingsconfig$.pipe(take(1)).subscribe((data: BASE_APP_SETTINGS) => {
      if(data){
        this.router.navigate(['..']);
      }
    });
  }
}
