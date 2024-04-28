import { ProductService } from '@/shared/services/product.service';
import { IProductInventory } from '@/types/product-inventory-type';
import { IProduct } from '@/types/product-type';
import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  public products: IProduct[] = [];
  public filteredProducts: IProduct[] = [];
  public searchText: string = '';
  public productType: string = '';
  public selectVal: string = '';
  public perView: number = 9;
  public sortBy: string = '';
  
  public selectOptions = [
    { value: 'ascending', text: 'По подразбиране' },
    { value: 'low-to-high', text: 'Възходящ' },
    { value: 'high-to-low', text: 'Низходящ' },
    { value: 'new-added', text: 'Дата на качване' },
    { value: 'on-sale', text: 'На промоция' },
  ];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private viewScroller: ViewportScroller
  ) {
    this.route.queryParams.subscribe(params => {
      this.searchText = params['searchText'] || '';
      this.productType = params['productType'] || '';
      this.selectVal = params['selectVal'] || '';
      this.sortBy = params['sortBy'] || '';
      this.productService.getAllProducts().subscribe(response => {
        this.products = response.products.filter(p => p.inventories && p.inventories.length > 0);
        this.applySortingAndFilters();
      });
    });
  }

  changeFilterSelect(selectedOption: { value: string; text: string }) {
    this.sortByFilter(selectedOption.value);
  }

  private applySortingAndFilters() {

    switch (this.sortBy) {
      case 'ascending':
        this.products = this.products.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'low-to-high':
        this.products = this.products.sort(
          (a, b) => this.getFirstAvailableInventoryPrice(a) - this.getFirstAvailableInventoryPrice(b)
        );
        break;
      case 'high-to-low':
        this.products = this.products.sort(
          (a, b) => this.getFirstAvailableInventoryPrice(b) - this.getFirstAvailableInventoryPrice(a)
        );
        break;
      case 'new-added':
        this.products = this.products.slice(-8);
        break;
      case 'on-sale':
        this.products = this.products.filter(p => this.getFirstAvailableInventory(p)?.discountPrice !== undefined);
        break;
    }

    this.products = this.products.filter(product => {
      const productNameMatches = !this.searchText || product.name.toLowerCase().includes(this.searchText.toLowerCase());
      const category = product.category;
      const productTypeMatches = !this.productType || !category || (category && category.name.toLowerCase() === this.productType.toLowerCase());
      return productNameMatches && productTypeMatches;
    });
  }

  private getFirstAvailableInventoryPrice(product: IProduct): number {
    const inventory = product.inventories.find(inv => inv.stockQuantity > 0);
    return inventory ? inventory.price : 0;
  }

  private getFirstAvailableInventory(product: IProduct): IProductInventory | undefined {
    return product.inventories.find(inv => inv.stockQuantity > 0);
  }

  ngOnInit(): void {}

  handlePerView(): void {
    this.perView += 3;
  }

  sortByFilter(value: string) {
    this.router
      .navigate([], {
        relativeTo: this.route,
        queryParams: { sortBy: value ? value : null },
        queryParamsHandling: 'merge',
        skipLocationChange: false,
      })
      .finally(() => {
        this.viewScroller.setOffset([120, 120]);
        this.viewScroller.scrollToAnchor('products');
      });
  }
}
