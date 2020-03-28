import * as _ from "lodash";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder
} from "@angular/forms";
import { AuthService } from "../../../shared/services/auth.service";
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
  public requiredMessage = REQUIRED_FIELD_ERROR;
  public emailValidationErrorName = EMAIL_VALIDATION_ERROR;
  public signInForm: FormGroup;
  constructor(
    public authService: AuthService,
    public router: Router,
    public fb: FormBuilder
  ) {}

  ngOnInit() {
    this.signInForm = this.fb.group({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", Validators.required)
    });
  }

  public validateByFieldName(formControlName, validateBy) {
    const formControl = this.signInForm.get(formControlName);
    const formControlRequiredError = _.get(formControl, `errors.${validateBy}`);
    const isFormTouched = _.get(formControl, "touched");
    return isFormTouched && formControlRequiredError;
  }

  public onSubmit() {
    const { email, password } = this.signInForm.value;
    this.authService
      .signIn({ email, password })
      .subscribe(() => this.router.navigate(["/setting"]));
  }
}
