import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../services/book.service';
import { Book } from '../models/book.interface';
import { NgbInputDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  standalone: false,
})
export class BookFormComponent implements OnInit {
  bookForm!: FormGroup;
  isEditMode = false;
  bookId?: number;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private route: ActivatedRoute,
    public router: Router,
    private config: NgbInputDatepickerConfig
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.config.minDate = { year: 1900, month: 1, day: 1 };
    const date = new Date();
    this.config.maxDate = {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    };
    this.checkEditMode();
  }

  private initializeForm(): void {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      note: [''],
      cover: [''],
      published_date: ['', Validators.required],
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
        console.log('wut', typeof book.published_date);
        const formatedBook = {
          ...book,
          published_date: this.transformDateToDatePickerValue(
            book.published_date
          ),
        };
        this.bookForm.patchValue(formatedBook);
      }
    });
  }

  private transformDatepickerValueToDate(datepickerValue: {
    year: number;
    month: number;
    day: number;
  }): Date {
    const typedDate: { year: number; month: number; day: number } =
      datepickerValue;
    return new Date(`${typedDate.year}/${typedDate.month}/${typedDate.day}`);
  }

  private transformDateToDatePickerValue(date: Date): {
    year: number;
    month: number;
    day: number;
  } {
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    };
  }

  onSubmit(): void {
    if (this.bookForm.invalid) return;

    this.bookForm.value.published_date = this.transformDatepickerValueToDate(
      this.bookForm.value.published_date
    );
    const book: Book = {
      ...this.bookForm.value,
    };

    if (this.isEditMode && this.bookId) {
      console.log('jedit');
      this.bookService
        .editBook({
          ...book,
          id: this.bookId,
          last_modification_date: new Date(),
        })
        .subscribe(() => this.router.navigate(['/']));
    } else {
      this.bookService
        .createBook(book)
        .subscribe(() => this.router.navigate(['/']));
    }
  }
}
