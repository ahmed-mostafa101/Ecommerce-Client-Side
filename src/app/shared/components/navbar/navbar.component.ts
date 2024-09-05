import { Component } from '@angular/core';
import { ProductsService } from '../../../core/services/products.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private productsService: ProductsService) { }

  categoryProducts(categoryName: string): void {
    const menu = document.getElementById('drop-menu');
    menu!.style.display = "none";
    this.productsService.getCategoryProducts(categoryName);
  }

  sort(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const sortBy = selectElement.value;
    const order = selectElement.options[selectElement.selectedIndex].getAttribute('order') as string;
    this.productsService.applySort(sortBy, order);
  }

  showMenu() {
    const menu = document.getElementById('drop-menu');
    if(menu) {
      const currentOpacity = menu.style.opacity;
      if(currentOpacity === '1') {
        menu.style.cssText = "opacity:0; z-index:-10; top:25px";
      } else {
        menu.style.cssText = "opacity:1; z-index:10; top:41px";
      }
    }
  }
}
