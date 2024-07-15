import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile-modification',
  templateUrl: './profile-modification.component.html',
  styleUrls: ['./profile-modification.component.css']
})
export class ProfileModificationComponent implements OnInit {
  profileModificationForm: FormGroup = new FormGroup({});
  submitted = false;
  errorMessage: string = '';
  currentUser: any = null;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.profileModificationForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (this.currentUser) {
      this.profileModificationForm.patchValue({
        username: this.currentUser.username,
        email: this.currentUser.email,
        password: ''
      });
    }
  }

  get f() { return this.profileModificationForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.profileModificationForm.invalid) {
      return;
    }

    const userData = this.profileModificationForm.value;

    this.userService.updateUser(this.currentUser.id, userData).subscribe({
      next: () => {
        this.currentUser = { ...this.currentUser, ...userData };
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.errorMessage = error.message;
      }
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
