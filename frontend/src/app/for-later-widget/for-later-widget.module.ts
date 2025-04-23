import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForLaterWidgetComponent } from './components/for-later-widget.component';

@NgModule({
  declarations: [ForLaterWidgetComponent],
  imports: [CommonModule],
  exports: [ForLaterWidgetComponent],
  providers: [],
})
export class ForLaterWidgetModule {}
