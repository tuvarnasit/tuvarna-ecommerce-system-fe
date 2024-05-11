import { ProductService } from '@/shared/services/product.service';
import { IProduct } from '@/types/product-type';
import { Component, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-trending-products',
  templateUrl: './trending-products.component.html',
  styleUrls: ['./trending-products.component.scss']
})
export class TrendingProductsComponent {

  public electronic_prd: IProduct[] = [];

  constructor(private cdr: ChangeDetectorRef, public productService: ProductService) {
    this.loadProducts();
  }

  public activeTab = 'Нови';
  public tabs = ['Нови', 'Подбрани', 'Най-продавани'];

  handleActiveTab(tab: string): void {
    this.activeTab = tab;
    this.filteredProducts = this.getFilteredProducts();
    this.cdr.detectChanges();
  }

  filteredProducts = this.getFilteredProducts();

  getFilteredProducts(): IProduct[] {
    if (this.activeTab === 'Нови') {
      return this.electronic_prd.slice(0, 8);
    } else if (this.activeTab === 'Подбрани') {
      return this.getFeaturedProducts(this.electronic_prd, 8);
    } else if (this.activeTab === 'Най-продавани') {
      return this.getTopSellers(this.electronic_prd, 8);
    } else {
      return [];
    }
  }

  private loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (response) => {
        this.electronic_prd = response.products.filter(product =>
          product.inventories && product.inventories.length > 0
        );
        this.filteredProducts = this.getFilteredProducts();
      },
      error: (error) => {
        console.error('Failed to fetch products', error);
      }
    });
  }

  private getFeaturedProducts(products: IProduct[], count: number): IProduct[] {
    return products.filter(product => product.isFeatured).slice(0, count);
  }

  private getRandomProducts(products: IProduct[], count: number): IProduct[] {

    for (let i = products.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [products[i], products[j]] = [products[j], products[i]];
    }
    return products.slice(0, count);
  }

  private getTopSellers(products: IProduct[], count: number): IProduct[] {
    return products
      .map(product => ({
        ...product,
        totalSold: product.sales.reduce((total, sale) => total + sale.quantitySold, 0)
      }))
      .sort((a, b) => b.totalSold - a.totalSold)
      .slice(0, count);
  }
}