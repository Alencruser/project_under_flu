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

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  // ici faire le retour de fonction du delete pour
  handleBookDeletion(bookId: number) {
    this.books = this.books.filter((book) => book.id !== bookId);
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
}
