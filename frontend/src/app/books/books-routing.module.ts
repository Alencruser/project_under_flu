import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from './components/book-list.component';
import { BookFormComponent } from './components/book-form.component';
import { BookViewComponent } from './components/book-view.component';
import { AuthGuard } from '../auth/guards/auth.guards';

const routes: Routes = [
  { path: '', canActivate: [AuthGuard], component: BookListComponent },
  { path: 'add', canActivate: [AuthGuard], component: BookFormComponent },
  { path: 'edit/:id', canActivate: [AuthGuard], component: BookFormComponent },
  { path: 'view', canActivate: [AuthGuard], component: BookViewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BooksRoutingModule {}
