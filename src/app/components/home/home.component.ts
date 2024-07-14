import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userDisplayName: string | null = null;

  constructor(private router: Router, private storageService: StorageService) {}

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      const currentUser = JSON.parse(this.storageService.getItem('currentUser') || 'null');
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
    this.storageService.removeItem('currentUser');
    this.router.navigate(['/']);
  }
}
