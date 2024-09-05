import { Component, Input } from '@angular/core';
import { createDefaultProduct, Product } from '../../models/product.model';
import { CartService } from '../../../core/services/cart.service';
import { RatingPipe } from '../../pipes/rating.pipe';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { ScrollToDirective } from '../../directives/scroll-to.directive';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    CommonModule,
    RatingPipe,
    RouterModule,
    RippleModule,
    ScrollToDirective,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product: Product = createDefaultProduct();

  constructor(private cartService: CartService, private messageService: MessageService) {}

  get newPrice(): string {
    return (this.product.price * (1 - this.product.discountPercentage / 100)).toFixed(2);
  }

  addToCart(productId: string) {
    const accessTOken = sessionStorage.getItem('accessToken');

    if (!accessTOken) {
      this.show();
    } else {
      this.cartService.addToCart(productId);
    }
  }

  show() {
    this.messageService.add({ detail: 'Please sign in first' });
  }
}
