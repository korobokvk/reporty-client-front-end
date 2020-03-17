import * as _ from "lodash";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpHeaders
} from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import { StorageProviderService } from "./shared/services/storage-provider.service";
import { TOKEN_NAME } from "./shared/constants/name-spaces";
import {
  SIGN_IN_COMPONENT,
  SIGN_UP_COMPONENT
} from "./shared/constants/routes";
import { SnackBarService } from "./shared/services/snack-bar.service";

const UNAUTHORIZED_STATUS_CODE = 401;
@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(
    private storageService: StorageProviderService,
    private snackBar: SnackBarService,
    private activatedRoute: ActivatedRoute
  ) {}

  private setJwtToHeader(): { headers: HttpHeaders } | {} {
    const token = this.storageService.getItemFromStorage(TOKEN_NAME);
    if (token) {
      return {
        headers: new HttpHeaders().set("authorization", `Bearer ${token}`)
      };
    }
    return {};
  }

  private skipUnAuthErrorOnAuthRoute(statusCode) {
    const currentRoute = _.get(
      this.activatedRoute,
      "_routerState.snapshot.url"
    );
    return (
      statusCode !== UNAUTHORIZED_STATUS_CODE &&
      (currentRoute === SIGN_IN_COMPONENT || currentRoute === SIGN_UP_COMPONENT)
    );
  }

  private sendError(err) {
    const { message, statusCode } = _.get(err, "error", { message: "" });
    const showError = this.skipUnAuthErrorOnAuthRoute(statusCode);
    if (showError) {
      this.snackBar.openShackBar(message);
    }
    return new Error(message);
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const clientReq = request.clone(this.setJwtToHeader());
    return next.handle(clientReq).pipe(
      catchError(err => {
        throw this.sendError(err);
      })
    );
  }
}
