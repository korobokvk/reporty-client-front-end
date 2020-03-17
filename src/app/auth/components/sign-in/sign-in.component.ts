import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../auth.service";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.scss"]
})
export class SignInComponent {
  private signInForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", Validators.required)
  });

  constructor(private authService: AuthService, private router: Router) {}

  private onSubmit() {
    const { email, password } = this.signInForm.value;
    this.authService
      .signIn({ email, password })
      .subscribe(() => this.router.navigate(["/setting"]));
  }
}
