import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories.component.html',
})
export class CategoriesComponent implements OnInit {
  private readonly http = inject(HttpClient);
  categories: any[] = [];

  ngOnInit(): void {
    this.http
      .get<any>('https://ecommerce.routemisr.com/api/v1/categories')
      .subscribe((response) => {
        this.categories = response.data;
      });
  }
}
