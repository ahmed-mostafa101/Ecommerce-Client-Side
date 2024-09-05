import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import { CartService } from '../../core/services/cart.service';
import { finalize, Observable } from 'rxjs';
import { Cart } from '../../shared/models/cart.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { OrdersService } from '../../core/services/orders.service';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [StepperModule, ButtonModule, ReactiveFormsModule, CommonModule, RippleModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  cartObs$ = new Observable<Cart | null>;
  checkoutForm: FormGroup;
  paymentForm: FormGroup;
  displayPopup = false;
  loading = true;

  constructor(private FB: FormBuilder,
              private cartService: CartService,
              private OrdersService: OrdersService,
              private router: Router) {
    this.cartObs$ = this.cartService.cartObs$;

    this.checkoutForm = this.FB.group({
      country: ['', Validators.required],
      city: ['', Validators.required],
      street: ['', [Validators.required]],
      postcode: ['', [Validators.required,]],
      fullName: ['', Validators.required],
      phoneNumber: ['', Validators.required]
    });

    this.paymentForm = this.FB.group({
      cardName: ['', Validators.required],
      cardNumber: ['', Validators.required],
      cvc: ['', [Validators.required]],
      expiryDate: ['', []]
    })
  }

  sendOrder() {
    this.displayPopup = true;
    document.body.style.overflow = "hidden";

    this.OrdersService.addOrder(this.checkoutForm.value).pipe(
      finalize(() => {
        this.loading = false;
      })
    ).subscribe({
      next: (data) => {
        console.log(data.message);
      },
      error: (error) => {
        console.log(error.error.message);
      }
    })
  }

  closePopup() {
    this.displayPopup = false;
    this.router.navigate(["/products-list"]);
    document.body.style.overflow = "visible";
  }

  goToOrders() {
    this.displayPopup = false;
    this.router.navigate(["/orders-list"]);
    document.body.style.overflow = "visible";
  }
}
