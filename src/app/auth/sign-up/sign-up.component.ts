import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder
} from "@angular/forms";
import { AuthService } from "../auth.service";
import { compareField } from "../validators/validators";

const errorMessage = "Passwords do not match";
@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.scss"]
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  constructor(private authService: AuthService, private fb: FormBuilder) {}

  ngOnInit() {
    this.signUpForm = this.fb.group(
      {
        email: ["", [Validators.email, Validators.required]],
        password: ["", [Validators.required]],
        rePassword: ["", [Validators.required]]
      },
      {
        validators: compareField(
          "password",
          "rePassword",
          "doNotMatch",
          errorMessage
        )
      }
    );
  }
  private onSubmit() {
    const { email, password } = this.signUpForm.value;
    this.authService.signUp({ email, password });
  }
}
