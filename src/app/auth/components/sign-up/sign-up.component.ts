import * as _ from "lodash";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { AuthService } from "../../../shared/services/auth.service";
import { compareField } from "../../validators/validators";
import {
  REQUIRED_FIELD_ERROR,
  EMAIL_VALIDATION_ERROR
} from "../../../shared/constants/error-messages";

const errorMessage = "Passwords do not match";
@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.scss"]
})
export class SignUpComponent implements OnInit {
  public requiredMessage = REQUIRED_FIELD_ERROR;
  public emailValidationErrorName = EMAIL_VALIDATION_ERROR;
  public signUpForm: FormGroup;
  constructor(
    public authService: AuthService,
    public fb: FormBuilder,
    public router: Router
  ) {}

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

  public validateByFieldName(formControlName, validateBy) {
    const formControl = this.signUpForm.get(formControlName);
    const formControlRequiredError = _.get(formControl, `errors.${validateBy}`);
    const isFormTouched = _.get(formControl, "touched");
    return isFormTouched && formControlRequiredError;
  }

  public onSubmit() {
    const { email, password } = this.signUpForm.value;
    this.authService
      .signUp({ email, password })
      .subscribe(() => this.router.navigate(["/setting"]));
  }
}
