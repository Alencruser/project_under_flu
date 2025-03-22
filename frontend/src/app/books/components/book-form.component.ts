import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../services/book.service';
import { Book } from '../models/book.interface';
import { NgbInputDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/alert/services/alert.service';
@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  standalone: false,
})
export class BookFormComponent implements OnInit {
  bookForm!: FormGroup;
  isEditMode = false;
  bookId?: number;
  bookDatePickerValue: { year: number; month: number; day: number } | null =
    null;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private route: ActivatedRoute,
    public router: Router,
    private config: NgbInputDatepickerConfig,
    private alertService: AlertService
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
        this.bookDatePickerValue = this.transformDateToDatePickerValue(
          book.published_date
        );
      }
    });
  }

  private transformDatepickerValueToDate(datepickerValue: {
    year: number;
    month: number;
    day: number;
  }): Date {
    return new Date(
      `${datepickerValue.year}-${String(datepickerValue.month).padStart(
        2,
        '0'
      )}-${String(datepickerValue.day).padStart(2, '0')}`
    );
  }

  private transformDateToDatePickerValue(date: string): {
    year: number;
    month: number;
    day: number;
  } {
    const splitDate = date.split('-');
    return {
      year: Number(splitDate[0]),
      month: Number(splitDate[1]),
      day: Number(splitDate[2]),
    };
  }

  formInvalid() {
    return this.bookForm.invalid || !this.bookDatePickerValue;
  }

  onSubmit(): void {
    if (this.bookForm.invalid || !this.bookDatePickerValue) return;

    const book: Book = {
      ...this.bookForm.value,
      published_date: this.transformDatepickerValueToDate(
        this.bookDatePickerValue
      ),
    };

    if (this.isEditMode && this.bookId) {
      this.bookService
        .editBook({
          ...book,
          id: this.bookId,
          last_modification_date: new Date(),
        })
        .subscribe({
          next: () => {
            this.alertService.showAlert('success', 'Book edited successfully');
          },
          error: (err) => {
            this.alertService.showAlert('danger', err);
          },
          complete: () => {
            this.router.navigate(['/']);
          },
        });
    } else {
      this.bookService.createBook(book).subscribe({
        next: () => {
          this.alertService.showAlert('success', 'Book created successfully');
        },
        error: (err) => this.alertService.showAlert('danger', err),
        complete: () => this.router.navigate(['/']),
      });
    }
  }
}
