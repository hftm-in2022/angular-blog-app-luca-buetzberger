import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-blog-app-luca-buetzberger';
  inputText = ''; // for NGModel
  count = 0;
  isRed = false;
  items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
  selectedOption = 1;

  // Method for click event
  incrementCount() {
    this.count++;
  }

  // Method for NGClass
  toggleColor() {
    this.isRed = !this.isRed;
  }
}
