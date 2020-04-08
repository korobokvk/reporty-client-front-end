import * as _ from "lodash";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { StorageProviderService } from "./shared/services/storage-provider.service";
import { TOKEN_NAME } from "./shared/constants/name-spaces";
import { ErrorService } from "./shared/services/error.service";
import { SpinnerService } from "./shared/services/spinner.service";

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(
    private storageService: StorageProviderService,
    private errorService: ErrorService,
    private spinnerService: SpinnerService
  ) {}

  private setJwtToHeader(): { headers: HttpHeaders } | {} {
    const token = this.storageService.getItemFromStorage(TOKEN_NAME);
    if (token) {
      return {
        headers: new HttpHeaders().set("authorization", `Bearer ${token}`),
      };
    }
    return {};
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const clientReq = request.clone(this.setJwtToHeader());
    this.spinnerService.setSpinnerState(true);
    return next.handle(clientReq).pipe(
      map((data) => {
        this.spinnerService.setSpinnerState(false);
        return data;
      }),
      catchError((err: HttpErrorResponse) => {
        this.spinnerService.setSpinnerState(false);
        this.errorService.handleError(err);
        return throwError(
          _.get(err, "message", "Something went wrong please try again later")
        );
      })
    );
  }
}
