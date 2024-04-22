import { IMenuItem } from '@/types/menu-d-type';
import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { IProductAll } from '@/types/product-all-type';
import { ICategory } from '@/types/category-type';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent {

  public menu_data: IMenuItem[] = [];
  private dailyCategories: string[] = ["мобилни устройства", "смарт часовници", "слушалки"];
  private gamingAndOffieCategories: string[] = ["офис компютри", "офис лаптопи",
    "гейминг компютри", "гейминг лаптопи"];
  private kitchenCategories: string[] = ["кафе машини", "хладилници", "фурни", "микровълнови"]

  constructor(private productService: ProductService, private categoryService: CategoryService) { }

  ngOnInit() {
    this.loadMenuData();
  }

  loadMenuData() {
    this.productService.getAllProducts().subscribe({
      next: (productData: IProductAll) => {
        const productsWithTotalSold = productData.products.map(product => ({
          ...product,
          totalQuantitySold: product.sales.reduce((total, sale) => total + sale.quantitySold, 0)
        }));

        productsWithTotalSold.sort((a, b) => b.totalQuantitySold - a.totalQuantitySold);

        this.menu_data = [{
          id: 1,
          link: '/home',
          title: 'НАЙ-Продавани',
          mega_menu: true,
          home_pages: productsWithTotalSold.slice(0, 4).map(product => ({
            id: product.id,
            title: product.name,
            img: product.imageUrl,
            link: '/product/' + product.id
          }))
        }];

        this.loadCategoryData();
        this.loadGamingAndOfficeData();
        this.loadKitchenData();
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
      next: (categoriesData) => {
        const shopMegaMenus = categoriesData.map((data, index) => ({
          link: '/shop',
          title: this.capitalizeFirstLetter(this.dailyCategories[index]),
          list_menus: data.products.map(product => ({
            title: product.name,
            link: '/product/' + product.id
          }))
        }));

        this.menu_data.push({
          id: 2,
          link: '/shop',
          title: 'Ежедневие',
          mega_menu: true,
          shop_mega_menus: shopMegaMenus
        });
      },
      error: (error) => {
        console.error('Failed to fetch category products', error);
      }
    });
  }

  loadGamingAndOfficeData() {
    const requests = this.gamingAndOffieCategories.map(category =>
      this.productService.getByCategoryName(category));
    forkJoin(requests).subscribe({
      next: (categoriesData) => {
        const productMenus = categoriesData.map((data, index) => ({
          id: index + 1,
          title: this.capitalizeFirstLetter(this.gamingAndOffieCategories[index]),
          link: `/category/${data.products[0]?.category?.id}`,
          dropdown_menus: data.products.map(product => ({
            title: product.name,
            link: '/product/' + product.id
          }))
        }));
        console.log(productMenus)
        this.menu_data.push({
          id: 3,
          link: '/shop',
          title: 'Офис и гейминг',
          mega_menu: true,
          product_menus: productMenus
        });
      },
      error: (error) => {
        console.error('Failed to fetch gaming and office products', error);
      }
    });
  }

  loadKitchenData() {
    const requests = this.kitchenCategories.map(categoryName =>
      this.categoryService.GetByName(categoryName));
    forkJoin(requests).subscribe({
      next: (categories: ICategory[]) => {
        const dropdownMenus = categories.map(category => ({
          title: this.capitalizeFirstLetter(category.name),
          link: `/category/${category.id}`
        }));

        this.menu_data.push({
          id: 4,
          link: '/shop',
          title: 'Кухненски уреди',
          drop_down: true,
          dropdown_menus: dropdownMenus
        });
      },
      error: (error) => console.error('Failed to fetch kitchen categories', error)
    });
  }

  capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
