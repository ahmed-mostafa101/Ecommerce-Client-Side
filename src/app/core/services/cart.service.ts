import { Injectable, OnDestroy } from '@angular/core';
import { Cart } from '../../shared/models/cart.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BASE_URL } from '../../shared/models/constants';
import { BehaviorSubject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService implements OnDestroy {
  private cartSubject = new BehaviorSubject<Cart | null>(null);
  cartObs$ = this.cartSubject.asObservable();
  private subscriptions = new Subscription();

  constructor(private http: HttpClient) { }


  getCart(accessToken: string) {
    const headers = new HttpHeaders({
      'auth-token': accessToken
    });

    this.subscriptions.add(
      this.http.get<{ cartStatus: string, cart: Cart }>(`${BASE_URL}/user/cart`, { headers }).subscribe({
        next: (data) => {
          this.cartSubject.next(data.cart);
        }
      })
    );
  }

  addToCart(productId: string, quantity = 1) {
    const accessToken = sessionStorage.getItem('accessToken');

    if (!accessToken) {
      return;
    }

    const headers = new HttpHeaders({
      'auth-token': accessToken
    });

    this.subscriptions.add(
      this.http.post<{ cart: Cart }>(`${BASE_URL}/user/cart/add`,
        { productId, quantity }, { headers }).subscribe((data) => {
          this.cartSubject.next(data.cart)
        }
      )
    );
  }

  deleteFromCart(productId: string, quantity: number, remove = false) {
    const accessToken = sessionStorage.getItem('accessToken');

    if (!accessToken) {
      return;
    }

    const headers = new HttpHeaders({
      'auth-token': accessToken
    });

    const params = new HttpParams()
    .set('productId', productId)
    .set('quantity', quantity.toString())
    .set('remove', remove.toString());

    this.subscriptions.add(
      this.http.delete<{ cart: Cart }>(`${BASE_URL}/user/cart/delete`,
        { headers, params }).subscribe((data) => {
          this.cartSubject.next(data.cart)
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
