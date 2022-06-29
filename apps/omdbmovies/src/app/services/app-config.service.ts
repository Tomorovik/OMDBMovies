import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { BASE_APP_SETTINGS } from "../models/app-settings.model";

@Injectable({
    providedIn: 'root'
  })
export class AppConfigService {
    public config: BASE_APP_SETTINGS = new BASE_APP_SETTINGS();

    public async init(http: HttpClient): Promise<void> {
        await this.setConfig(http);
    }

    private async setConfig(http: HttpClient): Promise<void> {
        const configUrl = "./assets/config.json";
        this.config = await firstValueFrom(http.get<any>(configUrl)).catch(x=> console.log(x));
    }
}
