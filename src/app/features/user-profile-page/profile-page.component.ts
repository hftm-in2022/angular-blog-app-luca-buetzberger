// src\app\features\user-profile-page\profile-page.component.ts

import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { filter, Observable } from 'rxjs';
import { Profile } from '../../models/profile.model';
import { CommonModule } from '@angular/common'; // Import CommonModule for pipes like 'date'

@Component({
  selector: 'app-profile-page',
  standalone: true, // Mark the component as standalone
  imports: [CommonModule], // Add CommonModule to enable pipes like 'date'
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  profile$!: Observable<Profile>;

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    // Filter out null values from the observable
    this.profile$ = this.profileService.profile$.pipe(
      filter((profile): profile is Profile => profile !== null), // Type guard to exclude null
    );
  }
}
