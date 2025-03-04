import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

import { CartService } from '../../core/services/cart/cart.service';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  imports: [CarouselModule, FormsModule, RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent {
  products: any[] = [];
  searchInput: string = '';

  constructor(
    private http: HttpClient,
    private cartService: CartService,
    private toastrService: ToastrService,
    private wishlistService: WishlistService
  ) {
    this.wishlistService.getAllWishlistProducts().subscribe((response) => {
      this.products = response.data;
    });
  }

  removeFromeWishlist(id: string) {
    this.wishlistService.removeProductFromWishlist(id).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.toastrService.success(res.message, 'FreshCart');
          this.wishlistService
            .getAllWishlistProducts()
            .subscribe((response) => {
              this.products = response.data;
            });
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
