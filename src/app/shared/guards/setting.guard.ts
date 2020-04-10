import { Injectable } from "@angular/core";
import { CanLoad, Router, Route, ActivatedRoute } from "@angular/router";
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { map, take, takeLast } from "rxjs/operators";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: "root",
})
export class SettingGuard implements CanLoad {
  private userAuthState: BehaviorSubject<boolean> = new BehaviorSubject(true);
  constructor(private authService: AuthService, private router: Router) {}

  canLoad(
    route: Route,
    segments
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.authObserver().pipe(
      take(1),
      map((data) => {
        return this.redirectToAuth(data);
      })
    );
  }

  private redirectToAuth(data) {
    if (!data) {
      this.router.navigate(["auth"]);
    }
    return data;
  }
}
