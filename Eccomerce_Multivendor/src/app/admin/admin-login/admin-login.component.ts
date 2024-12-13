import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginSignupService } from '../../shared/services/login-signup.service';
import { Router } from '@angular/router';
import { Subject, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit, OnDestroy {

  signInFormValue: any = {};
  user_data: any;
  private unsubscribe$ = new Subject<void>();  
  // Define the subscription property

  constructor(private router: Router, private loginService: LoginSignupService) {}

  ngOnInit(): void {}

  // Submit the login form
  onSubmitSignIn(): void {
    this.loginService.adminLogin(this.signInFormValue.userEmail, this.signInFormValue.userPassword)
    .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.user_data = data;
        if (this.user_data.length === 1) {
          sessionStorage.setItem("user_session_id", this.user_data[0].id);
          sessionStorage.setItem("role", this.user_data[0].role);
          this.router.navigateByUrl('/admin-dashboard');
        } else {
          alert("Invalid Response");
        }
        console.log(this.user_data);
      }, error => {
        console.error("My error", error);
        alert("An error occurred while logging in. Please try again.");
      });
  }

  // Unsubscribe from the login observable to avoid memory leaks
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
