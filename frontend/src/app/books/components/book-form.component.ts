import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../services/book.service';
import { Book } from '../models/book.interface';

@Component({
    selector: 'app-book-form',
    templateUrl: './book-form.component.html',
    standalone: false
})
export class BookFormComponent implements OnInit {
  bookForm!: FormGroup;
  isEditMode = false;
  bookId?: number;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.checkEditMode();
  }

  private initializeForm(): void {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      note: [''],
      lastModified: [new Date()],
    });
  }

  private checkEditMode(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.bookId = +id;
        this.loadBookData(this.bookId);
      }
    });
  }

  private loadBookData(id: number): void {
    this.bookService.getBook(id).subscribe((book) => {
      if (book) {
        this.bookForm.patchValue(book);
      }
    });
  }

  onSubmit(): void {
    if (this.bookForm.invalid) return;

    const book: Book = {
      ...this.bookForm.value,
      id: this.bookId,
    };

    if (this.isEditMode) {
      this.bookService
        .editBook(book)
        .subscribe(() => this.router.navigate(['/']));
    } else {
      this.bookService
        .createBook(book)
        .subscribe(() => this.router.navigate(['/']));
    }
  }
}
