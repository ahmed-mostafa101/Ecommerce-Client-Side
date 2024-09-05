import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ScrollToDirective } from '../../../shared/directives/scroll-to.directive';
import { Observable } from 'rxjs';
import { OrdersService } from '../../../core/services/orders.service';
import { OrdersList } from '../../../shared/models/orders.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-orders-list',
  standalone: true,
  imports: [CommonModule, ScrollToDirective, RouterModule],
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.css'
})
export class OrdersListComponent implements OnInit {
  ordersObs$ = new Observable<OrdersList | null>;

  constructor(private ordersService: OrdersService) {
    this.ordersObs$ = this.ordersService.ordersObs$;
  }

  ngOnInit(): void {
    this.ordersService.getOrders();
  }
}
