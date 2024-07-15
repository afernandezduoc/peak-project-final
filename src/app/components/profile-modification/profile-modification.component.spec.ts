import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileModificationComponent } from './profile-modification.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from '../../services/user.service';

describe('ProfileModificationComponent', () => {
  let component: ProfileModificationComponent;
  let fixture: ComponentFixture<ProfileModificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      declarations: [ProfileModificationComponent],
      providers: [UserService]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileModificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
