import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  errorMessage: string = '';
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  login() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;

    this.userService.authenticateUser(email, password).subscribe({
      next: (users) => {
        if (users.length > 0) {
          localStorage.setItem('currentUser', JSON.stringify(users[0]));
          this.router.navigate(['/home']);
        } else {
          this.errorMessage = 'Email o contraseña incorrectos';
        }
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
