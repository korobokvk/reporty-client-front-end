import * as _ from "lodash";
import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { urlPattern } from "../../shared/constants/validations-pattern";

@Component({
  selector: "app-setting",
  templateUrl: "./setting.component.html",
  styleUrls: ["./setting.component.scss"],
})
export class SettingComponent implements OnInit {
  public settingForm: FormGroup;
  public requiredMessage: string =
    "Please, provide API link to start using reporty";
  public isNotAlinkMessage = "Value must be a link";
  constructor(public fb: FormBuilder) {}

  ngOnInit() {
    this.settingForm = this.fb.group({
      link: new FormControl("", [
        Validators.required,
        Validators.pattern(urlPattern),
      ]),
    });
  }

  public validateLink(): string | void {
    const errors = this.settingForm.get("link").errors;
    const required = _.get(errors, "required");
    const pattern = _.get(errors, "pattern");
    if (required) return this.requiredMessage;
    if (pattern) return this.isNotAlinkMessage;
    return null;
  }

  public onSubmit() {
    const { link } = this.settingForm.value;
    alert("Hola amigo this feature is still in development");
    console.log(link);
  }
}
