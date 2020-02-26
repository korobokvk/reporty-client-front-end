import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.scss"]
})
export class SignInComponent implements OnInit {
  private signInForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", Validators.required)
  });
  constructor(private authService: AuthService) {}

  ngOnInit() {}

  private onSubmit() {
    console.log(this.signInForm.value);
    const { email, password } = this.signInForm.value;
    this.authService
      .signIn({ email, password })
      .subscribe(data => console.log(data));
  }
}
