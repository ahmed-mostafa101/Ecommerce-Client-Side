import { Routes } from '@angular/router';
import { ProductShowcaseComponent } from './features/products/product-showcase/product-showcase.component';
import { ProductsListComponent } from './features/products/products-list/products-list.component';
import { CartComponent } from './features/cart/cart.component';
import { LoginComponent } from './features/user/login/login.component';
import { OrdersListComponent } from './features/orders/orders-list/orders-list.component';
import { authGuard } from './core/guards/auth.guard';
import { RegisterComponent } from './features/user/register/register.component';
import { CheckoutComponent } from './features/checkout/checkout.component';
import { BestSellersComponent } from './features/products/best-sellers/best-sellers.component';

export const routes: Routes = [
  {path:'cart', component: CartComponent, canActivate: [authGuard]},
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'orders-list', component: OrdersListComponent, canActivate: [authGuard]},
  {path:'checkout', component: CheckoutComponent},
  {path:'products-list', component: ProductsListComponent},
  {path:'best-sellers', component: BestSellersComponent},
  {path:'product-showcase/:productId', component: ProductShowcaseComponent},
  {path:'**', redirectTo:'products-list', pathMatch:'full'},
];
