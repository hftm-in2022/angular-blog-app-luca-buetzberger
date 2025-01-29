// src\app\shared\blog-card\blog-card.component.ts

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogPost } from '../../core/models/blogpost.model';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-blog-card',
  imports: [CommonModule, MatCardModule, MatIconModule, TranslateModule],
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.scss'],
})
export class BlogCardComponent {
  @Input() blog!: BlogPost; // Input to receive blog data
  @Output() blogClick = new EventEmitter<string>(); // Output to emit click events

  onCardClick() {
    this.blogClick.emit(this.blog.documentID);
  }
}
