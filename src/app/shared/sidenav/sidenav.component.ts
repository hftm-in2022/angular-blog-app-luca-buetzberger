import { Component, HostBinding, HostListener } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatSidenavModule, RouterOutlet],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  @HostBinding('class.open') isOpen = false;

  toggle() {
    this.isOpen = !this.isOpen; // Toggle the sidenav state
  }

  close() {
    this.isOpen = false; // Close the sidenav
  }

  // Automatically closes the sidenav when the viewport becomes wide
  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.innerWidth > 768) {
      this.close(); // Close the sidenav if the viewport is wide
    }
  }
}
