import { ProductService } from '@/shared/services/product.service';
import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-status-filter',
  templateUrl: './status-filter.component.html',
  styleUrls: ['./status-filter.component.scss']
})
export class StatusFilterComponent {
  status: string[] = ['Промоция', 'Наличен', 'Изчерпан'];
  activeQuery: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private viewScroller: ViewportScroller,
    public productService: ProductService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams) => {
      this.activeQuery = queryParams['status'];
    });
  }

  handleStatusRoute(status: string): void {
    //const newStatus = status.toLowerCase().split(' ').join('-');
    const newStatus = status.toLowerCase();
    // Define the query parameters as an object
    const queryParams: Params = {
      status: newStatus,
    };

    this.router
      .navigate([], {
        relativeTo: this.route,
        queryParams, // Pass the queryParams object here
        queryParamsHandling: 'merge',
        skipLocationChange: false,
      })
      .finally(() => {
        this.viewScroller.setOffset([120, 120]);
        this.viewScroller.scrollToAnchor('products'); // Anchore Link
      });
  }
}
