import { Component, Input, OnInit, output } from '@angular/core';

@Component({
  selector: 'app-rating-widget',
  templateUrl: './rating-widget.component.html',
  styleUrls: ['./rating-widget.component.scss'],
  standalone: false,
})
export class RatingWidgetComponent implements OnInit {
  @Input({ required: true }) initialValue!: number | undefined;

  numbers: number[] = [];
  actualRating: number = -1;
  hoveringRate: number = -1;
  ratingValue = output<number>();

  constructor() {
    this.numbers = Array(5).map((x, i) => i);
  }

  ngOnInit(): void {
    this.actualRating = this.initialValue || -1;
  }

  public inTheRatingRange(i: number): boolean {
    return i < this.actualRating || i <= this.hoveringRate;
  }

  public setRating(i: number) {
    this.actualRating = i + 1 == this.actualRating ? -1 : i + 1;
    this.ratingValue.emit(this.actualRating);
  }

  public setHoveringRate(i: number) {
    this.hoveringRate = i;
  }

  public removeHoveringRate() {
    this.hoveringRate = -1;
  }
}
