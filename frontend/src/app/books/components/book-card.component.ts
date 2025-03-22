import { Component, Input, OnInit, output, Output } from '@angular/core';
import { Book } from '../models/book.interface';
import { BookService } from '../services/book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  standalone: false,
})
export class BookCardComponent implements OnInit {
  @Input({ required: true }) book!: Book;

  confirmDelete = output<number>();

  constructor(
    private bookService: BookService,
    private router: Router
  ) {
    console.log(this);
  }

  ngOnInit(): void {}

  getBookCover(book: Book) {
    return book.cover || 'assets/basic-book.jpg';
  }

  editBook(bookId: number): void {
    this.router.navigate([`/edit/`, bookId]);
  }

  deleteBook(bookId: number): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.removeBook(bookId).subscribe({
        next: () => {
          this.confirmDelete.emit(this.book.id);
          alert('Book deleted successfully!');
        },
        error: (error) => {
          console.error('Error deleting book:', error);
          alert('Failed to delete the book.');
        },
      });
    }
  }
}
