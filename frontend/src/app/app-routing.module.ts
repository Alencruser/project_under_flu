import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksRoutingModule } from './books/books-routing.module';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes), BooksRoutingModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
