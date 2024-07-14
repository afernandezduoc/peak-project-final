import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-section',
  templateUrl: './admin-section.component.html',
  styleUrls: ['./admin-section.component.css']
})
export class AdminSectionComponent implements OnInit {
  users: any[] = [];
  selectedUserIndex: number | null = null;
  editUserForm: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.editUserForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  loadUserForEdit(userId: number) {
    const user = this.users.find(u => u.id === userId);
    if (user) {
      this.editUserForm.patchValue({
        username: user.username,
        email: user.email,
        password: ''
      });
      this.selectedUserIndex = this.users.findIndex(u => u.id === userId);
    }
  }

  saveUser() {
    if (this.editUserForm.invalid) {
      return;
    }

    const userId = this.users[this.selectedUserIndex!].id;
    const userData = this.editUserForm.value;

    this.userService.updateUser(userId, userData).subscribe(() => {
      this.resetForm();
      this.loadUsers();
    });
  }

  deleteUser(userId: number) {
    this.userService.deleteUser(userId).subscribe(() => {
      this.loadUsers();
    });
  }

  resetForm() {
    this.editUserForm.reset();
    this.selectedUserIndex = null;
  }

  goBack() {
    this.router.navigate(['/']);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/']);
  }
}
