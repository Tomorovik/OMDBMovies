import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfigService } from './app-config.service';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(protected readonly httpClient: HttpClient, private configService: AppConfigService ) { }

  protected get<T>(params?: any): Observable<T> {
    const url = this.configService.config.apiUrl;
    if (params)
        return this.httpClient.get<T>(url, { params: params });
    return this.httpClient.get<T>(url);
}
}
