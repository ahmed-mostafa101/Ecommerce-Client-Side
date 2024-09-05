import { Component } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ScrollToDirective } from '../../shared/directives/scroll-to.directive';
import { RippleModule } from 'primeng/ripple';
import { Observable } from 'rxjs';
import { Cart } from '../../shared/models/cart.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, ScrollToDirective, RippleModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartObs$ = new Observable<Cart | null>;

  constructor(private cartService: CartService) {
    this.cartObs$ = this.cartService.cartObs$;
  }

  updatePlus(productId: string) {
    this.cartService.addToCart(productId);
  }

  updateMinus(productId: string, quantity: number) {
    this.cartService.deleteFromCart(productId, quantity);
  }

  deleteProduct(productId: string, quantity: number) {
    this.cartService.deleteFromCart(productId, quantity, true);
  }
}
