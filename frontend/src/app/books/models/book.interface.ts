export interface Book {
  id: number;
  title: string;
  author: string;
  note?: string;
  cover?: string;
  published_date: string;
  last_modification_date: Date;
}
