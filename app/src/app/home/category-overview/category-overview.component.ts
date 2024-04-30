import { ICategory } from '@/types/category-type';
import { Component } from '@angular/core';
import { CategoryService } from '../../shared/services/category.service';
import { IProduct } from '@/types/product-type';

@Component({
  selector: 'app-category-overview',
  templateUrl: './category-overview.component.html',
  styleUrls: ['./category-overview.component.scss']
})
export class CategoryOverviewComponent {

  public category_items: ICategory[] | null = null;

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (categories: any) => {
        this.category_items = (categories.categories as ICategory[])
          .map(category => ({
            ...category,
            name: this.capitalizeFirstLetter(category.name),
            products: category.products.filter((product: IProduct) =>
              product.inventories && product.inventories.length > 0)
          }))
          .sort((a, b) => b.products.length - a.products.length)
          .slice(0, 5);
      },
      error: (error) => {
        console.error('Failed to fetch categories', error);
        this.category_items = []; // Optionally handle error by setting to empty array
      }
    });
  }

  capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

}
