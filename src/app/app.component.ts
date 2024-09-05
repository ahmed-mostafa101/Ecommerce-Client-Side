import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { ProductsListComponent } from './features/products/products-list/products-list.component';
import { PrimeNGConfig } from 'primeng/api';
import { FooterComponent } from './shared/components/footer/footer.component';
import { UserService } from './core/services/user.service';
import { CartService } from './core/services/cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Store';

  constructor(
    private primengConfig: PrimeNGConfig,
    private userService: UserService,
    private cartService: CartService) {

    }

  ngOnInit() {
    this.primengConfig.ripple = true;

    const accessToken = sessionStorage.getItem('accessToken');
    if (accessToken) {
      this.userService.getUserProfile(accessToken);
      this.cartService.getCart(accessToken);
    }
  }
}
