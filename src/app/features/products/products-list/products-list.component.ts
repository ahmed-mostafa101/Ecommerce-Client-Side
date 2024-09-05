import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ProductsApiResponse } from '../../../shared/models/product.model';
import { ProductsService } from '../../../core/services/products.service';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card.component';
import { ScrollToDirective } from '../../../shared/directives/scroll-to.directive';
import { CommonModule } from '@angular/common';
import { Paginator, PaginatorModule } from 'primeng/paginator';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [
    ProductCardComponent,
    CommonModule,
    ScrollToDirective,
    PaginatorModule,
    SkeletonModule
  ],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  @ViewChild(Paginator) paginator!: Paginator;
  products$: Observable<ProductsApiResponse>;
  productsPerPage: number;

  constructor(private productsService: ProductsService) {
    this.products$ = this.productsService.productsObs$;
    this.productsPerPage = this.productsService.productsPerPage;
  }

  ngOnInit(): void {
    this.productsService.getProducts();

    this.subscription.add(
      this.products$.subscribe(() => {
        const page = this.paginator.first / this.paginator.rows + 1;
        if(page !== this.productsService.currentPage) {
          this.paginator.changePage(this.productsService.currentPage - 1);
        }
      })
    );
  }

  numberOfSkeletons(): number[] {
    return Array.from({ length: this.productsPerPage }, (_, i) => i + 1);
  }

  onPageChange(event: any) {
    this.productsService.currentPage = event.page + 1;
    this.productsService.getProducts();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
