import { HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppConfigService } from './services/app-config.service';
import { HeaderComponent } from './components/header/header/header.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

function initAppConfig(
  appConfigService: AppConfigService,
  http: HttpClient
): () => Promise<void> {
  return () => appConfigService.init(http);
}

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [AppRoutingModule, BrowserModule, HttpClientModule, RouterModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initAppConfig,
      deps: [AppConfigService, HttpClient],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
