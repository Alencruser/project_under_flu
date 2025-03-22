import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IAlert } from './alert.interface';

interface Alert {
  type: 'success' | 'danger' | 'warning' | 'info' | '';
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class AlertService implements IAlert {
  private alertSubject = new Subject<Alert>();
  alert$ = this.alertSubject.asObservable();

  showAlert(type: Alert['type'], message: string): void {
    this.alertSubject.next({ type, message });
  }

  clearAlert(): void {
    this.alertSubject.next({ type: '', message: '' });
  }
}
