import * as _ from "lodash";
import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { AuthService } from "../../auth.service";
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
  private requiredMessage = REQUIRED_FIELD_ERROR;
  private emailValidationErrorName = EMAIL_VALIDATION_ERROR;
  private signUpForm: FormGroup;
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

  private validateByFieldName(formControlName, validateBy) {
    const formControl = this.signUpForm.get(formControlName);
    const formControlRequiredError = _.get(formControl, `errors.${validateBy}`);
    const isFormTouched = _.get(formControl, "touched");
    return isFormTouched && formControlRequiredError;
  }

  private onSubmit() {
    const { email, password } = this.signUpForm.value;
    this.authService.signUp({ email, password });
  }
}
