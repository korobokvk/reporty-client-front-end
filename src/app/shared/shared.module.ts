import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { SnackBarComponent } from "./components/snack-bar/snack-bar.component";
import { SubHeaderComponent } from "./components/sub-header/sub-header.component";

@NgModule({
  declarations: [SnackBarComponent, SubHeaderComponent],
  entryComponents: [SnackBarComponent],
  imports: [CommonModule, MatSnackBarModule],
  exports: [
    SnackBarComponent,
    SubHeaderComponent,
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule
  ]
})
export class SharedModule {}
