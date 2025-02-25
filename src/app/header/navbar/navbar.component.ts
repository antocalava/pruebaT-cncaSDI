import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  userEmail: string | null = null;
  showLogout = false;
  username: string | null = localStorage.getItem('username');

  constructor(private authService: AuthService) {
    this.authService.getUserEmail().subscribe((email) => {
      this.userEmail = email;
    });
    if(this.userEmail) {
      localStorage.setItem('username', this.userEmail.split('@')[0]);
    }
    this.loadUsername();
  }
  
  loadUsername() {
    this.username = localStorage.getItem('username') || null;
  }

  toggleLogout() {
    this.showLogout = !this.showLogout;
    if (this.showLogout) {
      setTimeout(() => {
        document.addEventListener('click', this.closeLogoutOutside);
      });
    }
  }

  closeLogoutOutside = (event: Event) => {
    if (!(event.target as HTMLElement).closest('.user-info')) {
      this.showLogout = false;
      document.removeEventListener('click', this.closeLogoutOutside);
    }
  };

  isAdmin() {
    const role = this.authService.getRole();
    return role === 'admin1' || role === 'admin2';
  }  

  isAdmin2() {
    return this.authService.getRole() === 'admin2';
  }

  logout() {
    this.username = null;
    this.showLogout = false;
    this.authService.logout();
  }
}
