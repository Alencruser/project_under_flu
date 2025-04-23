import { Component, Input, OnInit, output, Output } from '@angular/core';
import { Book } from '../models/book.interface';
import { BookService } from '../services/book.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/alert/services/alert.service';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
  standalone: false,
})
export class BookCardComponent implements OnInit {
  @Input({ required: true }) book!: Book;

  confirmDelete = output<number>();

  constructor(
    private bookService: BookService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {}

  getBookCover(book: Book) {
    return book.cover || 'assets/basic-book.jpg';
  }

  GetBookCoverLoading(book: Book) {
    return !book.cover && 'lazy';
  }

  isNoteWritten(): boolean {
    if (this.book.note) return this.book.note.trim().length > 0;
    return false;
  }

  editBook(bookId: number): void {
    this.router.navigate([`/edit/`, bookId]);
  }

  deleteBook(bookId: number): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.removeBook(bookId).subscribe({
        next: () => {
          this.confirmDelete.emit(this.book.id);
          this.alertService.showAlert('success', 'Book deleted successfully');
        },
        error: (err) => {
          console.error('Error deleting book:', err.error.message);
          this.alertService.showAlert('warning', 'Failed to delete the book');
        },
      });
    }
  }

  viewBook() {
    this.router.navigate(['/view'], { state: { book: this.book } });
  }

  rateThisBook(rating: number) {
    const bookId = this.book.id;
    this.bookService.rateBook(bookId, rating).subscribe({
      next: () => {
        this.alertService.showAlert('success', 'Rate updated successfully');
      },
      error: (err) => {
        console.error('Failed to update the rate:', err.error.message);
        this.alertService.showAlert('warning', 'Failed to update the rate');
      },
    });
  }

  saveForLater(toSave: boolean) {
    const bookId = this.book.id;
    this.bookService.saveForLater(bookId, toSave).subscribe({
      next: () => {
        this.alertService.showAlert(
          'success',
          toSave ? 'Book saved for later' : 'Book removed from saved'
        );
      },
      error: (err) => {
        console.error('Failed to save the book:', err.error.message);
        this.alertService.showAlert(
          'warning',
          'Failed to save the book for later'
        );
      },
    });
  }
}
