import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BooksRoutingModule } from './books-routing.module';
import { BookListComponent } from './components/book-list.component';
import { BookFormComponent } from './components/book-form.component';
import { BookService } from './services/book.service';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

@NgModule({
  declarations: [BookListComponent, BookFormComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, BooksRoutingModule],
  providers: [BookService, provideHttpClient(withInterceptorsFromDi())],
})
export class BooksModule {}
