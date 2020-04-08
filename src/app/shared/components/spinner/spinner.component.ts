import { Component, OnInit } from "@angular/core";
import { ThemePalette } from "@angular/material/core";
import { ProgressSpinnerMode } from "@angular/material/progress-spinner";
import { SpinnerService } from "../../services/spinner.service";

@Component({
  selector: "app-spinner",
  templateUrl: "./spinner.component.html",
  styleUrls: ["./spinner.component.scss"],
})
export class SpinnerComponent implements OnInit {
  public showSpinner: boolean = true;
  public color: ThemePalette = "accent";
  public mode: ProgressSpinnerMode = "indeterminate";
  public value = 50;
  constructor(private spinnerService: SpinnerService) {}

  ngOnInit() {
    this.spinnerService.getSpinnerState().subscribe((data) => {
      this.showSpinner = data;
    });
  }
}
