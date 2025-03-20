export interface Book {
  id: number;
  title: string;
  author: string;
  note: string;
  cover?: string;
  published_date: Date;
  last_modification_date: Date;
}
