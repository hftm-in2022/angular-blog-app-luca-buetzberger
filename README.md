# AngularBlogAppLucaBuetzberger

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.9.

## Setup Guide

See how the project was set up here: [Setup Guide](docs/setup.md)

# The Poject

### Access the app

To run the application, start your own developement server by running the `ng serve` command.

Alternatively, you can check the app out here:
Note: The version on azure currently seems to have problems regarding the login using google, due to a wrong azure configuration. I currently do not know how to fix this.  
https://lemon-desert-069057103.5.azurestaticapps.net/

### Video presentation

Milestone 1:

### Project Structure

```bash
C:.
├───docs
├───public
└───src
├───app
│ ├───core
│ │ ├───guards
│ │ ├───models
│ │ └───services
│ ├───features
│ │ ├───blog-detail
│ │ ├───blog-overview
│ │ ├───create-blog
│ │ ├───demo-page
│ │ ├───login-page
│ │ ├───registration-page
│ │ └───user-profile-page
│ └───shared
│   ├───blog-card
│   ├───error-page
│   ├───loading-bar
│   ├───toolbar
│   └───validators
├───environments
└───public
```

### Patterns

The following patterns are used in these files:

Redux-Like Pattern:

- authentication.service.ts
- profile.service.ts

Signals:

- loading-bar.service.ts

## Angular Guide:

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
