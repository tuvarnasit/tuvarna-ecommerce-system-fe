import { IProduct } from '@/types/product-type';
import { Component, Input } from '@angular/core';
import { ProductService } from '@/shared/services/product.service';
import { ViewportScroller } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-shop-area',
  templateUrl: './shop-area.component.html',
  styleUrls: ['./shop-area.component.scss']
})
export class ShopAreaComponent {

  @Input() listStyle: boolean = false;
  @Input() full_width: boolean = false;
  @Input() shop_1600: boolean = false;
  @Input() shop_right_side: boolean = false;
  @Input() shop_no_side: boolean = false;

  public filterSelect = [
    { value: 'asc', text: 'По подразбиране' },
    { value: 'low', text: 'Възходящ' },
    { value: 'high', text: 'Низходящ' },
    { value: 'on-sale', text: 'Промоция' },
  ];
  public products: IProduct[] = [];
  public minPrice: number = 0;
  public maxPrice: number = 1550;
  public niceSelectOptions = this.filterSelect;
  public brands: string[] = [];
  public tags: string[] = [];
  public category: string | null = null;
  public subcategory: string | null = null;
  public status: string = '';
  public brand: string | null = null;
  public pageNo: number = 1;
  public pageSize: number = 9;
  public paginate: any = {};
  public sortBy: string = 'asc';
  public mobileSidebar: boolean = false;
  activeTab: string = this.listStyle ? 'list' : 'grid';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public productService: ProductService,
    private viewScroller: ViewportScroller
  ) {
    this.route.queryParams.subscribe(params => {
      this.initializeFilters(params);
      this.fetchFilteredProducts();
    });
  }

  ngOnInit(): void {
    this.updateMaxPrice();
  }

  handleActiveTab(tab: string) {
    this.activeTab = tab;
  }

  private updateMaxPrice() {
    this.productService.getMaxPrice().subscribe(maxPrice => {
      this.maxPrice = maxPrice;
    });
  }

  private initializeFilters(params: any): void {
    this.category = params['category'] ? params['category'].toLowerCase() : null;
    this.status = params['status'] ? params['status'].toLowerCase() : null;
    this.minPrice = params['minPrice'] || this.minPrice;
    this.maxPrice = params['maxPrice'] || this.maxPrice;
    this.pageNo = params['page'] || this.pageNo;
    this.sortBy = params['sortBy'] || this.sortBy;
  }

  private fetchFilteredProducts(): void {
    this.productService.filterProducts().subscribe(products => {
      this.products = this.productService.sortProducts(products, this.sortBy);
      this.applyFilters();
      this.paginateProducts();
    });
  }

  private applyFilters(): void {
    if (this.category) {
      this.products = this.products.filter(p => p.category?.name.toLowerCase() === this.category);
    }
    if (this.status) {
      this.products = this.products.filter(p => this.checkStatus(p, this.status));
    }
    this.products = this.products.filter(p => {
      const price = this.getFirstAvailableInventoryPrice(p);
      return price >= this.minPrice && price <= this.maxPrice;
    });
  }

  private checkStatus(product: IProduct, status: string): boolean {
    const hasStock = product.inventories.some(inv => inv.stockQuantity > 0);
    switch (status) {
      case 'промоция':
        return product.inventories.some(inv => inv.discountPrice != null && inv.discountPrice > 0);
      case 'наличен':
        return hasStock;
      case 'изчерпан':
        return !hasStock;
      default:
        return false;
    }
  }

  private getFirstAvailableInventoryPrice(product: IProduct): number {
    const inventory = product.inventories.find(inv => inv.stockQuantity > 0) || product.inventories[product.inventories.length - 1];
    return inventory.discountPrice || inventory.price;
  }

  private paginateProducts(): void {
    const pagerTotal = this.products.length;
    this.paginate = this.productService.getPager(pagerTotal, this.pageNo, this.pageSize);
    this.products = this.products.slice(this.paginate.startIndex, this.paginate.endIndex + 1);
  }

  // Append filter value to Url
  updateFilter(tags: any) {
    tags.page = null; // Reset Pagination
  }

  changeFilterSelect(selectedOption: { value: string, text: string }) {
    this.sortByFilter(selectedOption.value)
  }

  // SortBy Filter
  sortByFilter(value:string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { sortBy: value ? value : null},
      queryParamsHandling: 'merge',
      skipLocationChange: false
    }).finally(() => {
      this.viewScroller.setOffset([120, 120]);
      this.viewScroller.scrollToAnchor('products');
    });
  }

  // product Pagination
  setPage(page: number) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: page },
      queryParamsHandling: 'merge',
      skipLocationChange: false
    }).finally(() => {
      this.viewScroller.setOffset([120, 120]);
      this.viewScroller.scrollToAnchor('products'); // Anchore Link
    });
  }

  handleResetFilter () {
    this.updateMaxPrice();
    this.minPrice = 0;
    this.pageNo = 1;
    this.router.navigate(['shop']);
  }
}
