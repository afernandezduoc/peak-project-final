import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.css']
})
export class PasswordRecoveryComponent implements OnInit {
  passwordRecoveryForm: FormGroup = new FormGroup({});
  submitted = false;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.passwordRecoveryForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get f() { return this.passwordRecoveryForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.passwordRecoveryForm.invalid) {
      return;
    }

    const email = this.passwordRecoveryForm.value.email;

    this.userService.getUsers().subscribe({
      next: (users) => {
        const user = users.find((u: any) => u.email === email);
        if (user) {
          alert('Se ha enviado un correo de recuperación a su dirección de email.');
          this.router.navigate(['/login']);
        } else {
          this.errorMessage = 'El correo electrónico no está registrado.';
        }
      },
      error: (error) => {
        this.errorMessage = error.message;
      }
    });
  }
}
