import { ProductService } from '@/shared/services/product.service';
import { IProduct } from '@/types/product-type';
import { Component, Input } from '@angular/core';
import Swiper from 'swiper';
import { Scrollbar } from 'swiper/modules';

@Component({
  selector: 'app-product-details-related-products',
  templateUrl: './product-details-related-products.component.html',
  styleUrls: ['./product-details-related-products.component.scss']
})
export class ProductDetailsRelatedProductsComponent {

  @Input() productId!: number;
  @Input() category!: string;
  public related_products: IProduct[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadRelatedProducts();
    new Swiper('.tp-product-related-slider-active', {
      slidesPerView: 4,
      spaceBetween: 24,
      modules: [Scrollbar],
      scrollbar: {
        el: ".tp-related-swiper-scrollbar",
        draggable: true,
        dragClass: "tp-swiper-scrollbar-drag",
        snapOnRelease: true,
      },
      breakpoints: {
        "1200": {
          slidesPerView: 4,
        },
        "992": {
          slidesPerView: 3,
        },
        "768": {
          slidesPerView: 2,
        },
        "576": {
          slidesPerView: 2,
        },
        "0": {
          slidesPerView: 1,
        },
      }
    });
  }

  private loadRelatedProducts() {
    if (this.productId && this.category) {
      this.productService.getAllProducts().subscribe(response => {
        this.related_products = response.products.filter(product => {
          return product.inventories && product.inventories.some(inv => inv.stockQuantity > 0) &&
            product.category && product.category.name === this.category &&
            product.id !== this.productId;
        });
      });
    }
  }
}
