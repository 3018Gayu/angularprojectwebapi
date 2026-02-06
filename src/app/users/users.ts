import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from './usersservice';
import { User } from './usersmodel';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.html',
  styleUrls: ['./users.css']
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  selectedUser: User = this.emptyUser();
  isEdit = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  emptyUser(): User {
    return {
      userId: 0,
      name: '',
      email: '',
      role: 'Cashier',
      isActive: true
    };
  }

  loadUsers(): void {
    this.userService.getUsers()
      .subscribe(data => this.users = data);
  }

  addUser(): void {
    this.userService.createUser(this.selectedUser)
      .subscribe(() => {
        this.loadUsers();
        this.cancel();
      });
  }

  editUser(user: User): void {
    this.selectedUser = { ...user }; // keeps userId
    this.isEdit = true;
  }

  updateUser(): void {
    // 🔥 DO NOT send password on edit
    const { passwordHash, ...userWithoutPassword } = this.selectedUser;

    this.userService.updateUser(userWithoutPassword as User)
      .subscribe(() => {
        this.loadUsers();
        this.cancel();
      });
  }

  deleteUser(id: number): void {
    if (confirm('Delete this user?')) {
      this.userService.deleteUser(id)
        .subscribe(() => this.loadUsers());
    }
  }

  cancel(): void {
    this.selectedUser = this.emptyUser();
    this.isEdit = false;
  }

  trackByUser(index: number, u: User) {
    return u.userId;
  }
}
