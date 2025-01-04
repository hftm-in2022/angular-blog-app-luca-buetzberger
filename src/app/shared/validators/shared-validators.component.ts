// src\app\shared\validators\shared-validators.ts

import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class SharedValidators {
  // Password Validator:
  // At least 8 characters, at least 1 uppercase, at least 1 lowercase, at least 1 special character, no spaces.
  static password(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const passwordRegex =
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,256}$/;
      const valid = passwordRegex.test(control.value);
      return valid ? null : { invalidPassword: true };
    };
  }
}
