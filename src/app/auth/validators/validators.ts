import { AbstractControl } from "@angular/forms";
import * as _ from "lodash";

export const compareField = (
  fieldToCompareName,
  comparedFieldName,
  errorName,
  errorMessage
) => {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const {
      [fieldToCompareName]: compareValue,
      [comparedFieldName]: comparedValue
    } = control.value;

    const errorObject =
      compareValue !== comparedValue ? { [errorName]: errorMessage } : null;

    if (errorObject) {
      setErrorToField(comparedFieldName, control, errorObject);
    }
    return errorObject;
  };
};

export const setErrorToField = (
  fieldName: string,
  control: AbstractControl,
  error: { [key: string]: any }
): void => {
  const compareFieldErrors = control.get(fieldName).errors;
  control.get(fieldName).setErrors({ ...compareFieldErrors, ...error });
};
