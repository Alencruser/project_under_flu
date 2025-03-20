import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BooksRoutingModule } from './books-routing.module';
import { BookListComponent } from './components/book-list.component';
import { BookFormComponent } from './components/book-form.component';
import { BookService } from './services/book.service';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [BookListComponent, BookFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BooksRoutingModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
  ],
  providers: [BookService],
})
export class BooksModule {}
