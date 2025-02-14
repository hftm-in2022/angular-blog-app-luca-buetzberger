import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [FormsModule, MatButtonModule, MatInputModule, MatSelectModule, MatCardModule, CommonModule, TranslateModule],
  templateUrl: './demo-page.component.html',
  styleUrl: './demo-page.component.scss',
})
export class DemoPageComponent {
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
