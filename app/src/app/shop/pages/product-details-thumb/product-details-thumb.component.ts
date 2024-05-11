import { ProductService } from '@/shared/services/product.service';
import { UtilsService } from '@/shared/services/utils.service';
import { IProductImage } from '@/types/product-image-type';
import { IProduct } from '@/types/product-type';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-product-details-thumb',
  templateUrl: './product-details-thumb.component.html',
  styleUrls: ['./product-details-thumb.component.scss']
})
export class ProductDetailsThumbComponent implements OnChanges {
  @Input() product!: IProduct;
  public images: IProductImage[] = [];

  constructor(
    public productService: ProductService,
    public utilsService: UtilsService
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['product'] && changes['product'].currentValue) {
      this.productService.activeImg = this.product.imageUrl;
      this.updateImages();
    }
  }

  ngOnInit() {}

  private updateImages() {
    if (!this.product) {
      this.images = [];
      return;
    }

    const mainImage: IProductImage = {
      id: -1,
      imageUrl: this.product.imageUrl
    };

    const additionalImages = this.product.images || [];

    if (!additionalImages.some(img => img.imageUrl === this.product.imageUrl)) {
      this.images = [mainImage, ...additionalImages];
    } else {
      this.images = additionalImages;
    }
  }
}
