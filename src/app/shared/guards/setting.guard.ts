import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: "root",
})
export class SettingGuard implements CanActivate {
  private isUserAuth: boolean;
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.authService.authObserver().subscribe((data) => {
      this.isUserAuth = data;
    });

    if (!this.isUserAuth) {
      return this.router.parseUrl("/auth");
    }
    return this.isUserAuth;
  }
}
