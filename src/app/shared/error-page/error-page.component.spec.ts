// src\app\shared\error-page\error-page.component.spec.ts

// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ErrorPageComponent } from './error-page.component';
// import { provideRouter } from '@angular/router';
// import { By } from '@angular/platform-browser';

// describe('ErrorPageComponent', () => {
//   let component: ErrorPageComponent;
//   let fixture: ComponentFixture<ErrorPageComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [ErrorPageComponent], // Import the standalone component
//       providers: [
//         provideRouter([]), // Provide an empty router configuration for testing
//       ],
//     }).compileComponents();

//     fixture = TestBed.createComponent(ErrorPageComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   // Test 1: Component Creation
//   // This test ensures that the ErrorPageComponent is successfully created by Angular.
//   // It verifies that the component instance is defined and initialized properly.
//   it('should create the component', () => {
//     expect(component).toBeTruthy();
//   });

//   // Test 2: Render Content
//   // This test checks that the error message and other static content are rendered correctly in the template.
//   // It verifies the presence and correctness of the <h1> and <p> elements in the DOM.
//   it('should render the error message', () => {
//     const compiled = fixture.nativeElement as HTMLElement;
//     expect(compiled.querySelector('h1')?.textContent).toContain('Oops! Something went wrong.');
//     expect(compiled.querySelector('p')?.textContent).toContain("We're working to fix the issue.");
//   });

//   // Test 3: RouterLink Functionality
//   // This test ensures that the <a> tag has a routerLink directive pointing to the home page ('/').
//   // It also checks that the link behaves like a hyperlink by verifying its text and href attribute.
//   it('should have a working routerLink to the home page', () => {
//     const linkDebugElement = fixture.debugElement.query(By.css('a')); // Query the <a> element
//     const linkElement = linkDebugElement.nativeElement as HTMLAnchorElement;

//     // Check that the routerLink directive is present and points to "/"
//     expect(linkDebugElement.attributes['routerLink']).toBe('/');

//     // Check that the <a> element behaves like a link
//     expect(linkElement.textContent).toContain('Go back to Home');
//     expect(linkElement.getAttribute('href')).toBe('/');
//   });
// });
