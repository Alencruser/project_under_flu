import { Component, Input, OnInit, output } from '@angular/core';

@Component({
  selector: 'app-for-later-widget',
  templateUrl: './for-later-widget.component.html',
  styleUrls: ['./for-later-widget.component.scss'],
  standalone: false,
})
export class ForLaterWidgetComponent implements OnInit {
  @Input({ required: true }) initialValue!: boolean | undefined;

  toSave = output<boolean>();
  constructor() {}

  ngOnInit(): void {}

  saveForLater() {
    this.initialValue = !this.initialValue;
    this.toSave.emit(this.initialValue);
  }
}
