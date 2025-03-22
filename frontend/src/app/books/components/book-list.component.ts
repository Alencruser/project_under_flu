import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book.interface'; // Book interface for type safety
import { BookService } from '../services/book.service'; // Business logic service
import { debounceTime, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  standalone: false,
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  searchTitle: string = '';

  private searchSubject = new Subject<string>();

  constructor(
    private bookService: BookService,
    private router: Router
  ) {
    this.searchSubject.pipe(debounceTime(600)).subscribe((title: string) => {
      if (title.trim().length) {
        this.searchBooksByTitle(title);
      } else {
        this.loadBooks();
      }
    });
  }

  ngOnInit(): void {
    this.loadBooks();
  }

  searchBooksByTitle(title: string): void {
    this.bookService.getBooksByTitle(title).subscribe({
      next: (data: Book[]) => {
        this.books = data;
      },
      error: (error) => {
        console.error('Error fetching books:', error);
      },
    });
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

  handleBookDeletion(bookId: number) {
    this.books = this.books.filter((book) => book.id !== bookId);
  }

  searchTitleChange() {
    this.searchSubject.next(this.searchTitle);
  }

  navigateToAddBook() {
    this.router.navigate(['/add']);
  }
}
