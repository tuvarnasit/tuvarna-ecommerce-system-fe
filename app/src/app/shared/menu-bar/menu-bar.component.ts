import { IMenuItem } from '@/types/menu-d-type';
import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { IProductAll } from '@/types/product-all-type';
import { ICategory } from '@/types/category-type';
import { IProduct } from '@/types/product-type';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent {

  public mobileDevicesBestSeller: IProduct | null = null;
  public smartWatchesBestSeller: IProduct | null = null;
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
      next: (categoriesData: IProductAll[]) => {
        const shopMegaMenus = categoriesData.map((data, index) => {
          const categoryName = this.dailyCategories[index];
          const products = data.products;

          if (categoryName === "мобилни устройства") {
            this.mobileDevicesBestSeller = this.assignBestSeller(data.products);
        } else if (categoryName === "смарт часовници") {
            this.smartWatchesBestSeller = this.assignBestSeller(data.products);
        }

          return {
            link: '/shop',
            title: categoryName,
            list_menus: products.map(product => ({
              title: product.name,
              link: '/product/' + product.id
            }))
          };
        });

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
          title: this.gamingAndOffieCategories[index],
          link: `/category/${data.products[0]?.category?.id}`,
          dropdown_menus: data.products.map(product => ({
            title: product.name,
            link: '/product/' + product.id
          }))
        }));
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
          title: category.name,
          link: '/shop'
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

  assignBestSeller(products: IProduct[]): IProduct | null {
    if (!products.length) return null;

    let bestSeller = products[0];
    let maxSold = 0;

    products.forEach(product => {
        const totalSold = product.sales.reduce((acc, sale) => acc + sale.quantitySold, 0);
        if (totalSold > maxSold) {
            maxSold = totalSold;
            bestSeller = product;
        }
    });

    if (maxSold === 0) {
        bestSeller = products[Math.floor(Math.random() * products.length)];
    }

    return bestSeller;
}

  capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
