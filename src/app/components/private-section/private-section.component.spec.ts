import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { PrivateSectionComponent } from './private-section.component';
import { StorageService } from '../../services/storage.service';

describe('PrivateSectionComponent', () => {
  let component: PrivateSectionComponent;
  let fixture: ComponentFixture<PrivateSectionComponent>;
  let router: Router;
  let storageService: StorageService;

  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const storageServiceSpy = jasmine.createSpyObj('StorageService', ['setItem']);

    TestBed.configureTestingModule({
      declarations: [ PrivateSectionComponent ],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: StorageService, useValue: storageServiceSpy }
      ]
    });

    fixture = TestBed.createComponent(PrivateSectionComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    storageService = TestBed.inject(StorageService);
  });

  it('should navigate to pdf-viewer and store pdfUrl', () => {
    const pdfUrl = '/assets/pdf/report1.pdf';
    component.viewPdf(pdfUrl);
    expect(storageService.setItem).toHaveBeenCalledWith('pdfUrl', pdfUrl);
    expect(router.navigate).toHaveBeenCalledWith(['/pdf-viewer']);
  });
});
