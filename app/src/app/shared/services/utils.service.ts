import { IProduct } from '@/types/product-type';
import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CartService } from './cart.service';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  public openMobileMenus: Boolean = false;
  public isSearchOpen: Boolean = false;
  public isProductModalOpen: Boolean = false;
  public modalId: string = '';
  public product: IProduct | null = null;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isSearchOpen = false;
        this.isProductModalOpen = false;
        this.openMobileMenus = false;
        this.removeBackdropAndProductModal()
      }
    });
  }

  handleOpenMobileMenu() {
    this.openMobileMenus = !this.openMobileMenus;
  };

  handleOpenModal(id: string, item: IProduct) {
    this.isProductModalOpen = true;
    this.modalId = id;
    this.product = item;
    this.productService.handleImageActive(item.imageUrl);
    this.cartService.initialOrderQuantity();
  }

  removeBackdropAndProductModal() {
    const modalBackdrop = document.querySelector('.modal-backdrop');
    const product_modal = document.querySelector('.tp-product-modal.show') as HTMLElement;
    if (modalBackdrop) {
      modalBackdrop.remove();
      document.body.classList.remove('modal-open');
      document.body.removeAttribute('style');
    }
    if (product_modal) {
      product_modal.style.display = 'none';
    }
  }
}
