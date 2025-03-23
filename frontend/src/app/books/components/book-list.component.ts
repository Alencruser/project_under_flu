import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, Subject } from 'rxjs';
import { Book } from '../models/book.interface';
import { BookService } from '../services/book.service';

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
      error: (err) => {
        console.error('Error fetching books:', err.error.message);
      },
    });
  }

  loadBooks(): void {
    this.bookService.getAllBooks().subscribe({
      next: (data: Book[]) => {
        this.books = data;
      },
      error: (err) => {
        console.error('Error fetching books:', err.error.message);
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
