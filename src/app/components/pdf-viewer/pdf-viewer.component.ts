import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.css']
})
export class PdfViewerComponent implements OnInit {
  pdfUrl: SafeResourceUrl | null = null;

  constructor(private router: Router, private storageService: StorageService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    try {
      const url = this.storageService.getItem('pdfUrl');
      console.log(`Retrieved PDF URL: ${url}`);
      if (!url) {
        console.log('No URL found, navigating to home');
        this.router.navigate(['/']);
      } else {
        this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        console.log(`Sanitized PDF URL: ${this.pdfUrl}`);
      }
    } catch (error) {
      console.error('Error in ngOnInit:', error);
      this.router.navigate(['/']);
    }
  }

  goBack() {
    this.router.navigate(['/private-section']);
  }
}
