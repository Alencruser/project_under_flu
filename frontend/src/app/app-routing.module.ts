import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksRoutingModule } from './books/books-routing.module';
import { AuthRoutingModule } from './auth/auth-routing.module';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    BooksRoutingModule,
    AuthRoutingModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
