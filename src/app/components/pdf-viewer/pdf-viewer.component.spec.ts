import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { PdfViewerComponent } from './pdf-viewer.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { StorageService } from '../../services/storage.service';

describe('PdfViewerComponent', () => {
  let component: PdfViewerComponent;
  let fixture: ComponentFixture<PdfViewerComponent>;
  let router: Router;
  let storageService: StorageService;
  let sanitizer: DomSanitizer;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [PdfViewerComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        StorageService,
        { provide: DomSanitizer, useValue: jasmine.createSpyObj('DomSanitizer', ['bypassSecurityTrustResourceUrl']) }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PdfViewerComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    storageService = TestBed.inject(StorageService);
    sanitizer = TestBed.inject(DomSanitizer);

    // Espiar los métodos directamente en el servicio
    spyOn(storageService, 'getItem').and.callThrough();
  });

  afterEach(() => {
    (storageService.getItem as jasmine.Spy).calls.reset();
  });

  it('should navigate to home if pdfUrl is not found', () => {
    (storageService.getItem as jasmine.Spy).and.returnValue(null);
    component.ngOnInit();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should sanitize and set pdfUrl correctly', () => {
    const safeUrl = 'safeUrl';
    (storageService.getItem as jasmine.Spy).and.returnValue('/assets/pdf/report1.pdf');
    (sanitizer.bypassSecurityTrustResourceUrl as jasmine.Spy).and.returnValue(safeUrl);
    component.ngOnInit();
    expect(component.pdfUrl).toBe(safeUrl);
  });
});
