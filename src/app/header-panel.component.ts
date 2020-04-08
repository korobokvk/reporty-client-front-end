import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "./shared/services/auth.service";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";

@Component({
  selector: "app-header-panel",
  templateUrl: "./header-panel.component.html",
  styleUrls: ["./header-panel.component.scss"],
})
export class HeaderPanelComponent implements OnInit, OnDestroy {
  public hideAuthButtonIfUserExist: boolean;
  private $destroy: Subject<boolean> = new Subject<boolean>();
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.checkToken();
    this.authService
      .authObserver()
      .pipe(takeUntil(this.$destroy))
      .subscribe((data) => {
        this.hideAuthButtonIfUserExist = data;
      });
  }

  private checkToken() {
    return this.authService
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
