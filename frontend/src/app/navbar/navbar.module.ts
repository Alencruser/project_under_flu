import { NgModule } from '@angular/core';
import { NavbarComponent } from './components/navbar.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [NavbarComponent],
  exports: [NavbarComponent],
  imports: [CommonModule],
  providers: [],
})
export class NavbarModule {}
