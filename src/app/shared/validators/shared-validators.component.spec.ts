// src\app\shared\validators\shared-validators.spec.ts

import { SharedValidators } from './shared-validators.component';
import { FormControl } from '@angular/forms';

describe('SharedValidators', () => {
  describe('password', () => {
    const passwordValidator = SharedValidators.password();

    const testCases = [
      // Valid passwords
      {
        password: 'Password1!',
        isValid: true,
        description: 'Valid password with all criteria',
      },
      {
        password: 'Abc123$%',
        isValid: true,
        description: 'Valid password with special characters',
      },
      {
        password: 'StrongPass@1',
        isValid: true,
        description: 'Valid password with mixed characters',
      },

      // Invalid passwords
      {
        password: 'password1!',
        isValid: false,
        description: 'Missing an uppercase letter',
      },
      {
        password: 'PASSWORD1!',
        isValid: false,
        description: 'Missing a lowercase letter',
      },
      { password: 'Password!', isValid: false, description: 'Missing a digit' },
      {
        password: 'Password1',
        isValid: false,
        description: 'Missing a special character',
      },
      { password: 'Pass 1!', isValid: false, description: 'Contains a space' },
      {
        password: 'Short1!',
        isValid: false,
        description: 'Less than 8 characters',
      },
      {
        password: 'A'.repeat(257),
        isValid: false,
        description: 'More than 256 characters',
      },
      { password: '', isValid: false, description: 'Empty password' },
      { password: '12345678', isValid: false, description: 'Only digits' },
      {
        password: 'abcdefgh',
        isValid: false,
        description: 'Only lowercase letters',
      },
      {
        password: 'ABCDEFGH',
        isValid: false,
        description: 'Only uppercase letters',
      },
      {
        password: '!@#$%^&*',
        isValid: false,
        description: 'Only special characters',
      },
    ];

    testCases.forEach(({ password, isValid, description }) => {
      it(`should ${isValid ? 'accept' : 'reject'} "${password}" (${description})`, () => {
        const control = new FormControl(password);
        const result = passwordValidator(control);
        if (isValid) {
          expect(result).toBeNull(); // Valid passwords should return null
        } else {
          expect(result).toEqual({ invalidPassword: true }); // Invalid passwords should return an error object
        }
      });
    });
  });
});
