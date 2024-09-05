import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsService } from '../../../core/services/products.service';
import { CartService } from '../../../core/services/cart.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ScrollToDirective } from '../../directives/scroll-to.directive';
import { RippleModule } from 'primeng/ripple';
import { UserService } from '../../../core/services/user.service';
import { BadgeModule } from 'primeng/badge';
import { User } from '../../models/user.model';
import { OrdersService } from '../../../core/services/orders.service';
import { Cart } from '../../models/cart.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, ScrollToDirective, RippleModule, BadgeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  userProfile$ = new Observable<User | null>;
  cart$ = new Observable<Cart | null>;
  isDropdownVisible = false;
  darkMode = false;
  lightMode = true;

  constructor(
    private productsService: ProductsService,
    private cartService: CartService,
    private userService: UserService,
    private router: Router) {
      this.userProfile$ = this.userService.userObs$;
      this.cart$ = this.cartService.cartObs$;
    }

  ngOnInit() {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'enabled') {
      this.darkMode = true;
      this.lightMode = false;
      document.body.classList.add('dark-mode');
    }
  }

  toggleMode(): void {
    this.lightMode = !this.lightMode;
    this.darkMode = !this.darkMode;
    const body = document.body;
    const darkModeMode = body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', darkModeMode ? 'enabled' : 'disabled');
  }

  search(): void {
    const searchInput = document.getElementById("search-input") as HTMLInputElement;
    this.productsService.applySearch(searchInput.value);
  }

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  logout() {
    sessionStorage.removeItem('accessToken');
    this.router.navigate(['/products-list'])
      .then(() => {
        window.location.reload();
      });
  }
}
