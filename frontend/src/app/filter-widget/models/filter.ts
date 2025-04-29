export interface FilterField {
  key: string;
  type: 'string' | 'number' | 'boolean';
  label?: string;
  inputType?: 'text' | 'number' | 'checkbox' | 'select' | 'range';
}
