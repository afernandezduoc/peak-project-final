import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-private-section',
  templateUrl: './private-section.component.html',
  styleUrls: ['./private-section.component.css']
})
export class PrivateSectionComponent {
  constructor(private router: Router, private storageService: StorageService) {}

  viewPdf(pdfUrl: string) {
    console.log(`Storing PDF URL: ${pdfUrl}`);
    this.storageService.setItem('pdfUrl', pdfUrl);
    console.log('Navigating to /pdf-viewer');
    this.router.navigate(['/pdf-viewer']);
  }

  logout() {
    this.storageService.removeItem('currentUser');
    this.router.navigate(['/']);
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
