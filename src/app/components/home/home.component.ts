import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userDisplayName: string | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
      if (currentUser) {
        this.userDisplayName = currentUser.username || currentUser.email;
      }
    }
  }

  openLogin() {
    this.router.navigate(['/login']);
  }

  openUser() {
    this.router.navigate(['/profile-modification']);
  }

  openPrivateSection() {
    this.router.navigate(['/private-section']);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/']);
  }
}
