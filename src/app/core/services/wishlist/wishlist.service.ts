import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  constructor(private httpClient: HttpClient) {}

  addProductToWishlist(id: string): Observable<any> {
    return this.httpClient.post(
      'https://ecommerce.routemisr.com/api/v1/wishlist',

      {
        productId: id,
      }
    );
  }

  removeProductFromWishlist(id: string): Observable<any> {
    return this.httpClient.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`
    );
  }

  getAllWishlistProducts(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/wishlist`);
  }
}
