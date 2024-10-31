import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BlogService } from './services/blog.service';
import { of, throwError } from 'rxjs';
import { BlogPost } from './models/blogpost.model';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let blogServiceSpy: jasmine.SpyObj<BlogService>;
  let consoleSpy: jasmine.Spy;

  const mockBlogs: BlogPost[] = [
    {
      documentID: '1',
      title: 'Test Blog',
      content: 'Test Content',
      category: 'Test Category',
      publishedDate: new Date(),
      imageURL: 'test-image.jpg',
      audioURL: 'test-audio.mp3',
      userUID: 'test-user-123',
    },
  ];

  beforeEach(async () => {
    blogServiceSpy = jasmine.createSpyObj('BlogService', ['getBlogs']);
    consoleSpy = spyOn(console, 'error'); // Spy on console.error

    await TestBed.configureTestingModule({
      imports: [CommonModule, RouterOutlet, AppComponent],
      providers: [{ provide: BlogService, useValue: blogServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    consoleSpy.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load blogs successfully', fakeAsync(() => {
    blogServiceSpy.getBlogs.and.returnValue(of(mockBlogs));

    fixture.detectChanges();
    component.ngOnInit();
    tick();

    expect(component.blogs).toEqual(mockBlogs);
    expect(component.loading).toBeFalse();
    expect(component.error).toBe('');
  }));

  it('should handle error when loading blogs fails', fakeAsync(() => {
    const testError = new Error('Test error');
    blogServiceSpy.getBlogs.and.returnValue(throwError(() => testError));

    fixture.detectChanges();
    component.ngOnInit();
    tick();

    expect(component.blogs).toEqual([]);
    expect(component.loading).toBeFalse();
    expect(component.error).toBe(
      'Failed to load blogs. Please try again later.',
    );
    expect(consoleSpy).toHaveBeenCalledWith('Error loading blogs:', testError);
  }));
});
