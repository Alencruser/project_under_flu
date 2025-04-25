import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-widget',
  templateUrl: './filter-widget.component.html',
  styleUrls: ['./filter-widget.component.scss'],
  standalone: false,
})
export class FilterWidgetComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  // service filter instanciate selon type (model) envoyé, donc creer filtre par type de donnée et donnée
}
