import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { IProductAll } from '@/types/product-all-type'
import { IProduct } from '@/types/product-type';
import { IProductInventory } from '@/types/product-inventory-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  activeImg: string | undefined;

  private baseUrl: string = 'http://localhost:5141/api/v1/products';

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<IProductAll> {
    return this.http.get<IProductAll>(this.baseUrl).pipe(
      map(response => {
        const filteredProducts = response.products.filter(product =>
          product.inventories && product.inventories.length > 0);
        return { ...response, products: filteredProducts };
      })
    );
  }

  getByCategoryName(name: string): Observable<IProductAll> {
    return this.http.get<IProductAll>(`${this.baseUrl}/category/${name}`).pipe(
      map(response => {
        const filteredProducts = response.products.filter(product =>
          product.inventories && product.inventories.length > 0);
        return { ...response, products: filteredProducts };
      })
    );
  }

  getById(id: string): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.baseUrl}/${id}`);
  }

  getMaxPrice(): Observable<number> {
    return this.getAllProducts().pipe(
      map(response => {
        const productsWithInventory = response.products.filter(product => product.inventories && product.inventories.length > 0);
        let maxPrice = 0;
        productsWithInventory.forEach(product => {
          const firstAvailableInventory = product.inventories.find(inv => inv.stockQuantity > 0);
          const relevantInventory = firstAvailableInventory || product.inventories[product.inventories.length - 1];
          const currentMaxPrice = relevantInventory.discountPrice || relevantInventory.price;
          maxPrice = Math.max(maxPrice, currentMaxPrice);
        });
        return maxPrice;
      })
    );
  }

  filterProducts(filter: any[] = []): Observable<IProduct[]> {
    return this.getAllProducts().pipe(
      map(products => products.products.filter(product => {
        const hasValidInventories = product.inventories && product.inventories.length > 0;
        if (!filter.length) return hasValidInventories;

        const hasMatchingTags = product.tags?.some(tag => filter.includes(tag.name));
        return hasValidInventories && hasMatchingTags;
      }))
    );
  }

  public sortProducts(products: IProduct[], payload: string): any {
    switch (payload) {
      case 'asc':
        return products.sort((a, b) => a.id - b.id);
      case 'on-sale':
        return products.filter(p => {
          const inventory = this.getFirstOrLastInventory(p);
          return inventory.discountPrice && inventory.discountPrice > 0;
        });
      case 'low':
        return products.sort((a, b) => this.getFirstOrLastInventory(a).price - this.getFirstOrLastInventory(b).price);
      case 'high':
        return products.sort((a, b) => this.getFirstOrLastInventory(b).price - this.getFirstOrLastInventory(a).price);
      default:
        return products;
    }
  }

  private getFirstOrLastInventory(product: IProduct): IProductInventory {
    const firstAvailable = product.inventories.find(inv => inv.stockQuantity > 0);
    const lastInventory = product.inventories[product.inventories.length - 1];
    const relevantInventory = firstAvailable || lastInventory;

    if (relevantInventory.discountPrice == null) {
      relevantInventory.discountPrice = 0;
    }

    return relevantInventory;
  }

  public getPager(totalItems: number, currentPage: number = 1, pageSize: number = 9) {
    let totalPages = Math.ceil(totalItems / pageSize);

    let paginateRange = 3;

    if (currentPage < 1) {
      currentPage = 1;
    } else if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    let startPage: number, endPage: number;
    if (totalPages <= 5) {
      startPage = 1;
      endPage = totalPages;
    } else if (currentPage < paginateRange - 1) {
      startPage = 1;
      endPage = startPage + paginateRange - 1;
    } else {
      startPage = currentPage - 1;
      endPage = currentPage + 1;
    }

    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }

  handleImageActive(img: string) {
    this.activeImg = img;
  }
}
