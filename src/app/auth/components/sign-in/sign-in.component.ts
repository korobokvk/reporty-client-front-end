import * as _ from "lodash";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder
} from "@angular/forms";
import { AuthService } from "../../auth.service";
import {
  REQUIRED_FIELD_ERROR,
  EMAIL_VALIDATION_ERROR
} from "../../../shared/constants/error-messages";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.scss"]
})
export class SignInComponent implements OnInit {
  private requiredMessage = REQUIRED_FIELD_ERROR;
  private emailValidationErrorName = EMAIL_VALIDATION_ERROR;
  private signInForm: FormGroup;
  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.signInForm = this.fb.group({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", Validators.required)
    });
  }

  private validateByFieldName(formControlName, validateBy) {
    const formControl = this.signInForm.get(formControlName);
    const formControlRequiredError = _.get(formControl, `errors.${validateBy}`);
    const isFormTouched = _.get(formControl, "touched");
    return isFormTouched && formControlRequiredError;
  }

  private onSubmit() {
    const { email, password } = this.signInForm.value;
    this.authService
      .signIn({ email, password })
      .subscribe(() => this.router.navigate(["/setting"]));
  }
}
