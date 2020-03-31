import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./shared/auth.guard";

const routes: Routes = [
  {
    path: "auth",
    canActivate: [AuthGuard],
    loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)
  },
  {
    path: "setting",
    canActivate: [!AuthGuard],
    loadChildren: () =>
      import("./setting/setting.module").then(m => m.SettingModule)
  },
  {
    path: "**",
    redirectTo: "auth"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
