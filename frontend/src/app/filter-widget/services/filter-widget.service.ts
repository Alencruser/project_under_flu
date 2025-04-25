import { Injectable } from '@angular/core';
import { FilterField } from '../models/filter';

@Injectable({
  providedIn: 'root',
})
export class FilterWidgetService<T extends object> {
  constructor(private model: T) {}

  getFilterFields(): FilterField[] {
    return Object.entries(this.model)
      .map(([key, value]) => {
        const valueType = typeof value;

        if (
          valueType === 'string' ||
          valueType === 'number' ||
          valueType === 'boolean'
        ) {
          return {
            key,
            type: valueType as FilterField['type'],
          };
        }

        return null;
      })
      .filter((field): field is FilterField => field !== null);
  }
}
