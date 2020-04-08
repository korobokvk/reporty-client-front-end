import * as _ from "lodash";
import { Injectable } from "@angular/core";
import { SnackBarService } from "./snack-bar.service";
import { SIGN_IN_COMPONENT, SIGN_UP_COMPONENT } from "../constants/routes";
import { AuthService } from "./auth.service";
import { ActivatedRoute } from "@angular/router";

const UNAUTHORIZED_STATUS_CODE = 401;

@Injectable({
  providedIn: "root"
})
export class ErrorService {
  constructor(
    private snackBar: SnackBarService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {}

  public handleError(err): void {
    const { message, statusCode } = _.get(err, "error", {
      message: "Something went wrong please try again later"
    });
    switch (statusCode) {
      case UNAUTHORIZED_STATUS_CODE:
        return this.unAuthError(message);
      default:
        return this.defaultErrorHandler(message);
    }
  }

  private unAuthError(message): void {
    this.authService.setUnAuthorized();
    this.snackBar.openShackBar(message);
    return message;
  }

  private defaultErrorHandler(message): void {
    this.snackBar.openShackBar(message);
    return message;
  }

  private getCurrentRoute(): string {
    return _.get(this.activatedRoute, "_routerState.snapshot.url");
  }
}
