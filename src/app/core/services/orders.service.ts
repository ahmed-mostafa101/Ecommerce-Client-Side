import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { BASE_URL } from '../../shared/models/constants';
import { CustomerData, OrdersList } from '../../shared/models/orders.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private subscriptions = new Subscription();
  private ordersSubject = new Subject<OrdersList>;
  ordersObs$ = this.ordersSubject.asObservable();

  constructor(private http: HttpClient) { }

  getOrders() {
    const token = sessionStorage.getItem('accessToken') as string;

    const headers = new HttpHeaders({
      'auth-token': token
    });

    this.subscriptions.add(
      this.http.get<{ ordersList: OrdersList }>(`${BASE_URL}/user/orders`, { headers }).subscribe({
        next: (data) => {
          this.ordersSubject.next(data.ordersList);
          console.log(data.ordersList);
        }
      })
    );
  }

  addOrder(customerData: CustomerData) {
    const token = sessionStorage.getItem('accessToken') as string;

    const headers = new HttpHeaders({
      'auth-token': token
    });

    return this.http.post<{ message: string }>(`${BASE_URL}/user/orders/add`,
      { customerData }, { headers });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
