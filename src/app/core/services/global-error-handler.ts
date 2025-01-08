// src\app\core\services\global-error-handler.ts

/**
 * GlobalErrorHandler
 * This service is a custom global error handler for the Angular application. It catches all
 * unhandled errors and handles them based on the environment (production or development).
 * In production, it redirects the user to a generic error page. In development, it logs
 * the error details to the console for debugging purposes.
 */

import { ErrorHandler, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: Error): void {
    const message = error.message ? error.message : error.toString();
    if (environment.production) {
      window.location.href = '/error';
    } else {
      window.location.href = '/error';
      this.logErrorToConsole(error, message);
    }
  }

  private logErrorToConsole(error: Error, message: string): void {
    console.group('Global Error Handler');
    console.error('Message:', message);
    console.error('Stack:', error.stack || 'No stack trace available');
    console.groupEnd();
  }
}
