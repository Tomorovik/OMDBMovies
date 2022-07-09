import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppConfigService } from './services/app-config.service';
import { HeaderComponent } from './components/header/header/header.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpErrorHandlerInterceptor } from './interceptors/http-error-handler.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
function initAppConfig(
  appConfigService: AppConfigService,
  http: HttpClient
): () => Promise<void> {
  return () => appConfigService.init(http);
}

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [AppRoutingModule, BrowserModule, HttpClientModule, RouterModule, BrowserAnimationsModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorHandlerInterceptor,
      multi: true
    }    ,
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
