import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

import { CartService } from '../../core/services/cart/cart.service';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { SearchPipe } from '../../shared/pipes/search/search.pipe';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../../core/services/product/products.service';

@Component({
  selector: 'app-products',
  imports: [CarouselModule, SearchPipe, FormsModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  products: any[] = [];
  searchInput: string = '';

  constructor(
    private http: HttpClient,
    private cartService: CartService,
    private toastrService: ToastrService,
    private wishlistService: WishlistService,
    private productsService: ProductsService
  ) {
    this.productsService.getAllProducts().subscribe((response) => {
      this.products = response.data;
    });
  }

  addToWishlist(id: string) {
    this.wishlistService.addProductToWishlist(id).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.toastrService.success(res.message, 'FreshCart');
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addToCart(id: string): void {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.toastrService.success(res.message, 'FreshCart');
          this.cartService.cartNumber.next(res.numOfCartItems);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
