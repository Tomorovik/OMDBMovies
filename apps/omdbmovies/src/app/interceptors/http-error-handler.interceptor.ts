import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { Router } from "@angular/router";

@Injectable()
export class HttpErrorHandlerInterceptor implements HttpInterceptor {

  constructor(private readonly router: Router) { }

  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next
      .handle(request)
      .pipe(
        catchError((error: any, resp: Observable<HttpEvent<any>>) => {
          if (error instanceof HttpErrorResponse) {
            if (error.status === 404 && (<HttpErrorResponse>error).url?.includes("assets/config.json"))
              this.router.navigate(["/maintenance"]);
          }
          return throwError(error);
        })
      );
  }
}
