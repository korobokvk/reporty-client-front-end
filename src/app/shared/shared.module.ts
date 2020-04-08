import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { SnackBarComponent } from "./components/snack-bar/snack-bar.component";
import { SubHeaderComponent } from "./components/sub-header/sub-header.component";
import { SpinnerComponent } from "./components/spinner/spinner.component";

@NgModule({
  declarations: [SnackBarComponent, SubHeaderComponent, SpinnerComponent],
  entryComponents: [SnackBarComponent],
  imports: [CommonModule, MatSnackBarModule, MatProgressSpinnerModule],
  exports: [
    SnackBarComponent,
    SubHeaderComponent,
    SpinnerComponent,
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
  ],
})
export class SharedModule {}
