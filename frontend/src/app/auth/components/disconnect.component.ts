import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-disconnect',
  template: '',
  standalone: false,
})
export class DisconnectComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.disconnect();
    this.router.navigate(['/user/connect']);
  }
}
