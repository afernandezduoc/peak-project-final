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
  submitted = false;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  login() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    const { username, password } = this.loginForm.value;
    console.log(`Attempting login with username: ${username} and password: ${password}`);

    this.userService.authenticateUser(username, password).subscribe({
      next: (users) => {
        console.log('Users fetched:', users);
        if (users.length > 0) {
          localStorage.setItem('currentUser', JSON.stringify(users[0]));
          this.router.navigate(['/home']);
        } else {
          this.errorMessage = 'Usuario o contraseña incorrectos';
        }
      },
      error: (error) => {
        this.errorMessage = error.message;
        console.error('Error during authentication:', error);
      }
    });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  goToPasswordRecovery() {
    this.router.navigate(['/password-recovery']);
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
