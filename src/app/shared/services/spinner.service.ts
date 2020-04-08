import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SpinnerService {
  private $spinnerState: Subject<boolean> = new Subject();

  constructor() {}
  public getSpinnerState = () => this.$spinnerState.asObservable();
  public setSpinnerState = (state) => this.$spinnerState.next(state);
}
