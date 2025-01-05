import { ErrorHandler, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

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
