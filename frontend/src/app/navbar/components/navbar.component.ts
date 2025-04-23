import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: false,
})
export class NavbarComponent implements OnInit {
  public isMenuOpen = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  getUsername() {
    return this.authService.getUsername();
  }

  isConnected() {
    return !!this.authService.getToken();
  }

  logout() {
    return this.authService.disconnect();
  }
}
