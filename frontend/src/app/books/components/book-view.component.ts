import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PageFlip } from 'page-flip';
import { Book } from '../models/book.interface';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.scss'],
  standalone: false,
})
export class BookViewComponent implements AfterViewInit {
  @ViewChild('flipContainer', { static: false }) flipContainer!: ElementRef;
  pageFlip!: PageFlip;
  book: Book;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.book = navigation?.extras.state?.['book'];
    if (!this.book) {
      console.error('No book data received!');
    }
  }

  ngAfterViewInit(): void {
    this.pageFlip = new PageFlip(this.flipContainer.nativeElement, {
      width: 400,
      height: 600,
      showCover: true,
      mobileScrollSupport: false,
    });

    this.pageFlip.loadFromHTML(document.querySelectorAll('.page'));
  }

  getBookCover(): string {
    return this.book.cover || 'assets/basic-book.jpg';
  }

  getBookNote(): string {
    return this.book.note || "Unfortunately you didn't write a note yet.";
  }

  nextPage() {
    this.pageFlip.flipNext();
  }

  prevPage() {
    this.pageFlip.flipPrev();
  }
}
