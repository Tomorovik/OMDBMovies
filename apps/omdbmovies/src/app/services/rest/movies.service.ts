import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { BASE_APP_SETTINGS } from "../../models/app-settings.model";
import { AppConfigService } from "../app-config.service";

@Injectable({
  providedIn: "root"
})
export class MoviesService {

  private apiUrl: string = "";

  constructor(protected readonly httpClient: HttpClient, private configService: AppConfigService) {
    this.configService.appSettingsconfig$
      .pipe(take(1))
      .subscribe((config: BASE_APP_SETTINGS) => {
        this.apiUrl = config.apiUrl;
      });
  }

  public getMovies<T>(params?: any): Observable<T> {
    if (params)
      return this.httpClient.get<T>(this.apiUrl, { params: params });
    return this.httpClient.get<T>(this.apiUrl);
  }

  public getMovie<T>(request: any): Observable<T> {
    if (request)
      return this.httpClient.get<T>(this.apiUrl, { params: request });
    return this.httpClient.get<T>(this.apiUrl);
  }
}
