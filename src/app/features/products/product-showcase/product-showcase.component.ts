import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductsService } from '../../../core/services/products.service';
import { createDefaultProduct, Product } from '../../../shared/models/product.model';
import { CartService } from '../../../core/services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RatingPipe } from '../../../shared/pipes/rating.pipe';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-product-showcase',
  standalone: true,
  imports: [CommonModule, FormsModule, RatingPipe, RippleModule],
  templateUrl: './product-showcase.component.html',
  styleUrl: './product-showcase.component.css'
})
export class ProductShowcaseComponent {
  product: Product = createDefaultProduct();
  currentImage: string = '';

  tabs: { title: string, content: string }[] = [];

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private productsService: ProductsService) {

    }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.productsService.fetchSingleProduct(params['productId']).subscribe(data => {
        this.product = data;
        this.currentImage = this.product.thumbnail;
      });
    });

    this.tabs = [
      { title: 'Tab 1', content: 'Tab 1 Content' },
      { title: 'Tab 2', content: 'Tab 2 Content' },
      { title: 'Tab 3', content: 'Tab 3 Content' }
    ];
  }

  onHoverImage(image: string): void {
    this.currentImage = image;
  }


  get newPrice(): string {
    return (this.product.price * (1 - this.product.discountPercentage/100)).toFixed(2);
  }

  addToCart(productId: string) {
    const quantity = (document.getElementById('quantity') as HTMLInputElement).value;
    this.cartService.addToCart(productId, +quantity);
  }


  selectedTab: string = 'description';

  selectTab(tab: string) {
    this.selectedTab = tab;
  }
}
