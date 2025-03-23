import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from './components/book-list.component';
import { BookFormComponent } from './components/book-form.component';
import { BookViewComponent } from './components/book-view.component';

const routes: Routes = [
  { path: '', component: BookListComponent },
  { path: 'add', component: BookFormComponent },
  { path: 'edit/:id', component: BookFormComponent },
  { path: 'view', component: BookViewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BooksRoutingModule {}
