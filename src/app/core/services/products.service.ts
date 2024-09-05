import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Product, ProductsApiResponse } from '../../shared/models/product.model';
import { BASE_URL } from '../../shared/models/constants';
import { Subject, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductsService implements OnDestroy {
  private subscriptions = new Subscription();
  productsSubject = new Subject<ProductsApiResponse>;
  productsObs$ = this.productsSubject.asObservable();
  productsPerPage = 16;
  currentPage = 1;

  params = {
    categoryName: '',
    searchKey: '',
    sortOrder: '',
    sortBy: '',
    minPrice: '',
    maxPrice: '',
    limit: '',
    skip: ''
  }

  constructor(private http: HttpClient, private router: Router) { }

  fetchSingleProduct(productId: number) {
    return this.http.get<Product>(`${BASE_URL}/products/${productId}`);
  }

  applySearch(searchKey: string): void {
    this.params.searchKey = searchKey;
    this.currentPage = 1;
    this.getProducts();
  }

  applySort(sortBy: string, sortOrder: string) {
    this.params.sortOrder = sortOrder;
    this.params.sortBy = sortBy;
    this.currentPage = 1;
    this.getProducts();
  }

  getCategoryProducts(categoryName: string): void {
    this.params.categoryName = categoryName;
    this.currentPage = 1;
    this.getProducts();
  }

  getProducts(): void {
    this.params.skip = ((this.currentPage - 1) * this.productsPerPage).toString();
    this.params.limit = (this.productsPerPage).toString();

    let httpParams = new HttpParams();

    (Object.keys(this.params) as (keyof typeof this.params)[]).forEach(key => {
      if (this.params[key]) {
        httpParams = httpParams.set(key, this.params[key]);
      }
    });

    this.router.navigate(['/products-list']);

    this.subscriptions.add(
      this.http.get<ProductsApiResponse>(`${BASE_URL}/products`, { params: httpParams })
      .subscribe(response => this.productsSubject.next(response))
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
