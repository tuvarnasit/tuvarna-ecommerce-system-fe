import { ActivatedRoute, Router } from '@angular/router';
import { Component, Output, Input, EventEmitter, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Options } from 'ngx-slider-v2';
import { ViewportScroller } from '@angular/common';
import { ProductService } from '@/shared/services/product.service';

@Component({
  selector: 'app-price-filter',
  templateUrl: './price-filter.component.html',
  styleUrls: ['./price-filter.component.scss']
})
export class PriceFilterComponent implements OnInit {

  @Output() priceFilter: EventEmitter<{ minPrice: number; maxPrice: number }> = new EventEmitter();
  @Input() min!: number;
  @Input() max!: number;

  public collapse: boolean = true;
  public isBrowser: boolean = false;
  public price: { minPrice: number; maxPrice: number } = {
    minPrice: 0,
    maxPrice: 0,
  };
  public options: Options = {
    floor: 0,
    ceil: 0,
    hidePointerLabels: true,
  };

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    public productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private viewScroller: ViewportScroller,
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.updateMaxPrice();
  }

  private updateMaxPrice() {
    this.productService.getMaxPrice().subscribe(maxPrice => {
      // Ensure Angular detects the change by creating a new object
      this.options = { ...this.options, ceil: maxPrice };
      // Also update maxPrice for other uses
      this.max = maxPrice;
    });
  }

  appliedFilter(event: any) {
    this.price = { minPrice: event.value, maxPrice: event.highValue };
    this.priceFilter.emit(this.price);
  }

  handlePriceRoute() {
    this.router
      .navigate([], {
        relativeTo: this.route,
        queryParams: this.price,
        queryParamsHandling: 'merge',
        skipLocationChange: false,
      })
      .finally(() => {
        this.viewScroller.setOffset([120, 120]);
        this.viewScroller.scrollToAnchor('products');
      });
  }
}

