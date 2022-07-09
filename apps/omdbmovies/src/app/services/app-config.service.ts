import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, firstValueFrom } from "rxjs";
import { BASE_APP_SETTINGS } from "../models/app-settings.model";

@Injectable({
    providedIn: "root"
})
export class AppConfigService {

    public appSettingsconfig$: BehaviorSubject<BASE_APP_SETTINGS> = new BehaviorSubject<BASE_APP_SETTINGS>({} as BASE_APP_SETTINGS);

    public async init(http: HttpClient,): Promise<void> {
        await this.setConfig(http);
    }

    private async setConfig(http: HttpClient): Promise<void> {
        const configUrl = "./assets/config.json";
        const appSettingsconfig = await firstValueFrom(http.get<any>(configUrl));
        this.appSettingsconfig$.next(appSettingsconfig);
    }
}
