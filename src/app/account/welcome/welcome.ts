import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="welcome-page">
      <div class="overlay">
        <div class="welcome-content text-center">
          <h1>Welcome {{ userName }} 👋</h1>
          <p>You are logged in as <strong>{{ userRole }}</strong></p>
          <button class="btn btn-light btn-lg mt-3" (click)="goDashboard()">
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .welcome-page {
      width: 100vw;
      height: 100vh;
      background: url('https://img.freepik.com/free-vector/hand-drawn-flat-design-people-waving-illustration_23-2149195760.jpg') center/cover no-repeat;
    }
    .overlay {
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.6);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .welcome-content {
      color: #fff;
      background: rgba(0,0,0,0.4);
      padding: 2rem;
      border-radius: 1rem;
    }
  `]
})
export class WelcomeComponent {
  userName = '';
  userRole = '';

  constructor(private auth: AuthService, private router: Router) {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/account/login']);
      return;
    }

    this.userName = this.auth.name ?? '';
    this.userRole = this.auth.role ?? '';
  }

  goDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
