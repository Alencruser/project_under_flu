import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service'; // Business logic service
import { Book } from '../models/book.interface'; // Book interface for type safety
import { Router } from '@angular/router'; // For navigation (e.g., to the edit form)

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  standalone: false,
})
export class BookListComponent implements OnInit {
  books: Book[] = [];

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getAllBooks().subscribe({
      next: (data: Book[]) => {
        this.books = data;
      },
      error: (error) => {
        console.error('Error fetching books:', error);
      },
    });
  }

  getBookCover(book: Book) {
    return book.cover || 'assets/leather-texture.jpg';
  }

  openBookForm(): void {
    this.router.navigate(['/add']);
  }

  editBook(bookId: number): void {
    this.router.navigate([`/edit/`, bookId]);
  }

  deleteBook(bookId: number): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.removeBook(bookId).subscribe({
        next: () => {
          this.books = this.books.filter((book) => book.id !== bookId);
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
