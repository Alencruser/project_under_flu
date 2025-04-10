import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConnectComponent } from './components/connect.component';
import { RegisterComponent } from './components/register.component';
import { AuthGuard } from './guards/auth.guards';
import { AuthService } from './services/auth.service';
import { RouterLink } from '@angular/router';
import { DisconnectComponent } from './components/disconnect.component';

@NgModule({
  declarations: [ConnectComponent, RegisterComponent, DisconnectComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  exports: [],
  providers: [AuthService, AuthGuard],
})
export class AuthModule {}
