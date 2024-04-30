import { CategoryService } from '@/shared/services/category.service';
import { ProductService } from '@/shared/services/product.service';
import { ICategory } from '@/types/category-type';
import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.scss']
})
export class CategoryFilterComponent {

  public categoryData: ICategory[] = [];
  activeQuery: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private viewScroller: ViewportScroller,
    public productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams) => {
      this.activeQuery = queryParams['category'];
    });
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data: { categories: ICategory[] }) => {
        this.categoryData = data.categories.map(category => ({
          ...category,
          products: category.products.filter(product => 
            product.inventories && product.inventories.length > 0
          )
        }));
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      }
    });
  }

  handleCategoryRoute(value: string): void {
    //const newCategory = value.toLowerCase().replace('&', '').split(' ').join('-');
    const newCategory = value.toLowerCase();
    const queryParams: Params = {
      category: newCategory,
    };

    this.router
      .navigate([], {
        relativeTo: this.route,
        queryParams,
        queryParamsHandling: 'merge',
        skipLocationChange: false,
      })
      .finally(() => {
        this.viewScroller.setOffset([120, 120]);
        this.viewScroller.scrollToAnchor('products');
      });
  }
}
