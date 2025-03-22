import { NgModule } from '@angular/core';
import { AlertComponent } from './components/alert.component';
import { CommonModule } from '@angular/common';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [AlertComponent],
  imports: [CommonModule, NgbAlertModule],
  exports: [AlertComponent],
  providers: [],
})
export class AlertModule {}
