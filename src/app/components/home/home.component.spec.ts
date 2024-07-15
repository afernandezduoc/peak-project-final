import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HomeComponent } from './home.component';
import { StorageService } from '../../services/storage.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let router: Router;
  let storageService: StorageService;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        StorageService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    storageService = TestBed.inject(StorageService);

    // Espiar los métodos directamente en el servicio
    spyOn(storageService, 'getItem').and.callThrough();
    spyOn(storageService, 'removeItem').and.callThrough();
  });

  afterEach(() => {
    (storageService.getItem as jasmine.Spy).calls.reset();
    (storageService.removeItem as jasmine.Spy).calls.reset();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve the username from localStorage', () => {
    (storageService.getItem as jasmine.Spy).and.returnValue(JSON.stringify({ username: 'testUser', email: 'test@example.com' }));
    component.ngOnInit();
    expect(storageService.getItem).toHaveBeenCalledWith('currentUser');
    expect(component.userDisplayName).toBe('testUser');
  });

  it('should navigate to login', () => {
    component.openLogin();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should navigate to profile modification', () => {
    component.openUser();
    expect(router.navigate).toHaveBeenCalledWith(['/profile-modification']);
  });

  it('should navigate to private section', () => {
    component.openPrivateSection();
    expect(router.navigate).toHaveBeenCalledWith(['/private-section']);
  });

  it('should log out and navigate to home', () => {
    component.logout();
    expect(storageService.removeItem).toHaveBeenCalledWith('currentUser');
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});
