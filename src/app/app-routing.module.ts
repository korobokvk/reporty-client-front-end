import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./shared/guards/auth.guard";
import { SettingGuard } from "./shared/guards/setting.guard";

const routes: Routes = [
  {
    path: "auth",
    canActivate: [AuthGuard],
    loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)
  },
  {
    path: "setting",
    canActivate: [SettingGuard],
    loadChildren: () =>
      import("./setting/setting.module").then(m => m.SettingModule)
  },
  {
    path: "",
    redirectTo: "setting",
    pathMatch: "full"
  },
  {
    path: "**",
    redirectTo: "auth",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
