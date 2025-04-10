import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.interface';
import { AlertService } from 'src/app/alert/services/alert.service';
@Component({
  selector: 'app-user-connect',
  templateUrl: './connect.component.html',
  standalone: false,
})
export class ConnectComponent implements OnInit {
  userForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public router: Router,
    private authService: AuthService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.userForm.invalid) return;
    const user: User = {
      ...this.userForm.value,
    };
    this.authService.connect(user).subscribe({
      next: () => {
        this.alertService.showAlert('success', 'Connected successfully');
      },
      error: (err) => {
        this.alertService.showAlert('danger', err.error.message);
      },
      complete: () => {
        this.router.navigate(['/']);
      },
    });
  }
}
