// src\app\shared\validators\shared-validators.ts

import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const minBlogPostTitleLength = 5;
const minBlogPostContentLength = 5;

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

  static blogPostTitle() {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value && control.value.length < minBlogPostTitleLength) {
        return {
          minlength: {
            requiredLength: minBlogPostTitleLength,
            actualLength: control.value.length,
          },
        };
      }
      return null;
    };
  }

  static blogPostContent() {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value && control.value.length < minBlogPostContentLength) {
        return {
          minlength: {
            requiredLength: minBlogPostContentLength,
            actualLength: control.value.length,
          },
        };
      }
      return null;
    };
  }
}
