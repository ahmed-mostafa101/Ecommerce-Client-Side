import { Component } from '@angular/core';
import { Product } from '../../../shared/models/product.model';
import { Observable, Subject, Subscription } from 'rxjs';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card.component';
import { CommonModule } from '@angular/common';
import { ScrollToDirective } from '../../../shared/directives/scroll-to.directive';
import { SkeletonModule } from 'primeng/skeleton';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../../../shared/models/constants';
import { flush } from '@angular/core/testing';

@Component({
  selector: 'app-best-sellers',
  standalone: true,
  imports: [
    ProductCardComponent,
    CommonModule,
    ScrollToDirective,
    SkeletonModule
  ],
  templateUrl: './best-sellers.component.html',
  styleUrl: './best-sellers.component.css'
})
export class BestSellersComponent {
  private subscription: Subscription = new Subscription();
  bestSubject = new Subject<Product[]>;
  bestSellers$ = this.bestSubject.asObservable();
  loading = true;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.subscription.add(
      this.http.get<{bestSellers: Product[]}>(`${BASE_URL}/products/best-sellers`).subscribe({
        next: (data) => {
          this.bestSubject.next(data.bestSellers);
          this.loading = false;
        },
        error: (error) => {
          console.log(error);
        }
      })
    );
  }

  numberOfSkeletons(): number[] {
    return Array.from({ length: 20 }, (_, i) => i + 1);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
