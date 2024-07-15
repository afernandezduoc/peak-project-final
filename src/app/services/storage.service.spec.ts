import { TestBed } from '@angular/core/testing';
import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
  });

  it('should store item in localStorage', () => {
    spyOn(localStorage, 'setItem');
    service.setItem('pdfUrl', '/assets/pdf/report1.pdf');
    expect(localStorage.setItem).toHaveBeenCalledWith('pdfUrl', '/assets/pdf/report1.pdf');
  });

  it('should retrieve item from localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue('/assets/pdf/report1.pdf');
    const result = service.getItem('pdfUrl');
    expect(localStorage.getItem).toHaveBeenCalledWith('pdfUrl');
    expect(result).toBe('/assets/pdf/report1.pdf');
  });
});
