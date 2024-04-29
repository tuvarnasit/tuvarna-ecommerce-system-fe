import { Router } from '@angular/router';
import { Component, Renderer2 } from '@angular/core';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-header-category',
  templateUrl: './header-category.component.html',
  styleUrls: ['./header-category.component.scss']
})
export class HeaderCategoryComponent {

  public categoryItems: any[] = [];
  public isActive: boolean = false;

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (response) => {
        this.categoryItems = response.categories.map((item: any) => ({
          ...item,
          name: this.capitalizeFirstLetter(item.name)
        }));
      },
      error: (error) => {
        console.error('Error fetching categories', error);
      }
    });
    
  }

  capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  public handleActive(): void {
    this.isActive = !this.isActive;
  }

  public handleParentCategory(value: string): void {
    const newCategory = value.toLowerCase();
    this.router.navigate(['/shop'], { queryParams: { category: newCategory } });
  }
}
