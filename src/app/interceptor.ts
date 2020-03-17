import * as _ from "lodash";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpHeaders
} from "@angular/common/http";
import { StorageProviderService } from "./shared/services/storage-provider.service";
import { TOKEN_NAME } from "./shared/constants/name-spaces";
import { SnackBarService } from "./shared/services/snack-bar.service";

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(
    private storageService: StorageProviderService,
    private snackBar: SnackBarService
  ) {}

  private setJwtToHeader(): { headers: HttpHeaders } | {} {
    const token = this.storageService.getItemFromStorage(TOKEN_NAME);
    if (token) {
      return { headers: new HttpHeaders().set("access-token", token) };
    }
    return {};
  }

  private sendError(err) {
    const { message } = _.get(err, "error", { message: "" });
    this.snackBar.openShackBar(message);
    return new Error(message);
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log("");
    const clientReq = request.clone(this.setJwtToHeader());
    return next.handle(clientReq).pipe(
      catchError(err => {
        throw this.sendError(err);
      })
    );
  }
}
