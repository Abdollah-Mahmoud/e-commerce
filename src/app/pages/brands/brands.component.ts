import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './brands.component.html',
})
export class BrandsComponent implements OnInit {
  private readonly http = inject(HttpClient);
  brands: any[] = [];

  ngOnInit(): void {
    this.fetchBrands();
  }

  fetchBrands(): void {
    this.http
      .get<any>('https://ecommerce.routemisr.com/api/v1/brands')
      .subscribe({
        next: (response) => {
          this.brands = response.data;
        },
        error: (err) => {
          console.error('Error fetching brands:', err);
        },
      });
  }
}
