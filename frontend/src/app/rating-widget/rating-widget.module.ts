import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingWidgetComponent } from './components/rating-widget.component';

@NgModule({
  declarations: [RatingWidgetComponent],
  imports: [CommonModule],
  exports: [RatingWidgetComponent],
  providers: [],
})
export class RatingWidgetModule {}
