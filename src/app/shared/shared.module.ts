import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { SnackBarComponent } from "./components/snack-bar/snack-bar.component";

@NgModule({
  declarations: [SnackBarComponent],
  entryComponents: [SnackBarComponent],
  imports: [CommonModule, MatSnackBarModule],
  exports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    SnackBarComponent
  ]
})
export class SharedModule {}
