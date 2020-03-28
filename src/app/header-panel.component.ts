import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./shared/services/auth.service";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";

@Component({
  selector: "app-header-panel",
  templateUrl: "./header-panel.component.html",
  styleUrls: ["./header-panel.component.scss"]
})
export class HeaderPanelComponent implements OnInit, OnDestroy {
  public hideAuthButtonIfUserExist: boolean;
  private $destroy: Subject<boolean> = new Subject<boolean>();
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.checkToken();
    this.authService.authObserver
      .pipe(takeUntil(this.$destroy))
      .subscribe(data => {
        this.hideAuthButtonIfUserExist = data;
        if (!data) {
          this.router.navigate(["/"]);
        }
      });
  }

  private checkToken() {
    this.authService
      .checkIfTokenValid()
      .pipe(takeUntil(this.$destroy))
      .subscribe();
  }

  public logOut() {
    this.authService.logOut();
  }

  ngOnDestroy() {
    this.$destroy.next(true);
  }
}
