import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  standalone: false,
})
export class AlertComponent implements OnInit, OnDestroy {
  private alertSubscription: Subscription;

  public message: string = '';
  public type: 'success' | 'danger' | 'warning' | 'info' | '' = '';

  constructor(private alertService: AlertService) {
    this.alertSubscription = this.alertService.alert$.subscribe((alert) => {
      this.message = alert.message;
      this.type = alert.type;
      setTimeout(() => this.clearAlert(), 5000);
    });
  }

  ngOnInit(): void {}

  clearAlert() {
    this.message = '';
    this.type = '';
  }

  ngOnDestroy(): void {
    this.alertSubscription.unsubscribe();
  }
}
