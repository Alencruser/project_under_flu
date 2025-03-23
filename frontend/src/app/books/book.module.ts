import { CommonModule } from '@angular/common';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { BooksRoutingModule } from './books-routing.module';
import { BookCardComponent } from './components/book-card.component';
import { BookFormComponent } from './components/book-form.component';
import { BookListComponent } from './components/book-list.component';
import { BookService } from './services/book.service';
import { BookViewComponent } from './components/book-view.component';

@NgModule({
  declarations: [
    BookListComponent,
    BookFormComponent,
    BookCardComponent,
    BookViewComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BooksRoutingModule,
    NgbDatepickerModule,
  ],
  providers: [BookService, provideHttpClient(withInterceptorsFromDi())],
})
export class BooksModule {}
