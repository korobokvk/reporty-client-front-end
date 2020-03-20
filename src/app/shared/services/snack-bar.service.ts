import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackBarComponent } from "../components/snack-bar/snack-bar.component";

@Injectable({
  providedIn: "root"
})
export class SnackBarService {
  constructor(private matSnack: MatSnackBar) {}

  public openShackBar(message: string): void {
    this.matSnack.openFromComponent(SnackBarComponent, {
      data: message,
      duration: 2500
    });
  }
}
