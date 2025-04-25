import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterWidgetComponent } from './components/filter-widget.component';

@NgModule({
  declarations: [FilterWidgetComponent],
  imports: [CommonModule],
  exports: [FilterWidgetComponent],
  providers: [],
})
export class FeatureModule {}
