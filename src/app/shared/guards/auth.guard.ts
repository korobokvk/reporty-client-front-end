import { Injectable, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, Subject, of, BehaviorSubject } from "rxjs";
import { take, map, takeLast, buffer, bufferCount } from "rxjs/operators";
import { CanLoad } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanLoad {
  private isUserAuth: boolean;
  userAuthState: BehaviorSubject<boolean> = new BehaviorSubject(true);
  constructor(private authService: AuthService, private router: Router) {}

  canLoad(route, segments): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.authObserver().pipe(
      take(1),
      map((data) => {
        return this.redirectToSetting(data);
      })
    );
  }

  private redirectToSetting(data) {
    if (data) {
      this.router.navigate(["setting"]);
    }
    return !data;
  }
}
