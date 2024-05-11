import { IMobileType } from '@/types/menu-d-type';
import { Component } from '@angular/core';
import { UtilsService } from '../services/utils.service';
import { CategoryService } from '../services/category.service';
import { ICategory } from '@/types/category-type';
import { ProductService } from '../services/product.service';
import { IProductAll } from '@/types/product-all-type';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-mobile-sidebar',
  templateUrl: './mobile-sidebar.component.html',
  styleUrls: ['./mobile-sidebar.component.scss']
})
export class MobileSidebarComponent {

  public categoryItems: any[] = [];
  public mobile_menu: IMobileType[] = [];
  public isCategoryActive: boolean = false;
  public openCategory: string = '';
  public isActiveMenu: string = '';
  public isToggleActive: string = '';
  private dailyCategories: string[] = ["мобилни устройства", "смарт часовници", "слушалки", "офис компютри", "офис лаптопи",
    "гейминг компютри", "гейминг лаптопи", "кафе машини", "хладилници", "фурни", "микровълнови"];

  constructor(
    public utilsService: UtilsService,
    private categoryService: CategoryService,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.loadCategories();
    this.loadMenuData();
  }

  toggleCategoryActive() {
    this.isCategoryActive = !this.isCategoryActive;
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (response) => {
        this.categoryItems = response.categories
          .map((category: ICategory) => ({
            ...category,
            products: category.products.filter(product =>
              product.inventories && product.inventories.length > 0 &&
              product.inventories.some(inventory => inventory.stockQuantity > 0)
            )
          }))
          .filter((category: ICategory) => category.products.length > 0)
          .sort((a: ICategory, b: ICategory) => b.products.length - a.products.length)
          .slice(0, 3)
          .map((category: ICategory) => ({
            ...category,
            name: this.capitalizeFirstLetter(category.name)
          }));
      },
      error: (error) => {
        console.error('Error fetching categories', error);
      }
    });
  }

  loadMenuData() {
    this.productService.getAllProducts().subscribe({
      next: (productData: IProductAll) => {
        const productsWithTotalSold = productData.products.map(product => ({
          ...product,
          totalQuantitySold: product.sales.reduce((total, sale) => total + sale.quantitySold, 0)
        }));

        productsWithTotalSold.sort((a, b) => b.totalQuantitySold - a.totalQuantitySold);

        this.mobile_menu = [{
          id: 1,
          homes: true,
          link: '/home',
          title: 'НАЙ-Продавани',
          home_pages: productsWithTotalSold.slice(0, 4).map(product => ({
            id: product.id,
            title: product.name,
            img: product.imageUrl,
            link: '/shop/product-details/' + product.id
          }))
        }];
        this.loadCategoryData();
      },
      error: (error) => {
        console.error('Failed to fetch products for menu', error);
      }
    });
  }

  loadCategoryData() {
    const requests = this.dailyCategories.map(category =>
      this.productService.getByCategoryName(category));
    forkJoin(requests).subscribe({
      next: (categoriesData: IProductAll[]) => {
        categoriesData.forEach((data, index) => {
          const categoryName = this.dailyCategories[index];
          const products = data.products;
          this.mobile_menu.push({
            id: 2,
            link: `/shop`,
            title: this.capitalizeFirstLetter(categoryName),
            sub_menu: true,
            sub_menus: products.map(product => ({
              title: product.name,
              link: '/shop/product-details/' + product.id
            }))
          });
        });
      },
      error: (error) => {
        console.error('Failed to fetch category products', error);
      }
    });
  }


  handleOpenSubMenu(title: string) {
    this.isActiveMenu = (this.isActiveMenu === title) ? '' : title;
  }

  handleOpenSubCategory(title: string) {
    if (title === this.openCategory) {
      this.openCategory = "";
    } else {
      this.openCategory = title;
    }
  };

  handleToggleActive = (type: string) => {
    if (type === this.isToggleActive) {
      this.isToggleActive = "";
    } else {
      this.isToggleActive = type;
    }
  };

  capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
