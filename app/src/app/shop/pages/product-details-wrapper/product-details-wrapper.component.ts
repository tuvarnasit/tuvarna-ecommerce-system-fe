import { CartService } from '@/shared/services/cart.service';
import { ProductService } from '@/shared/services/product.service';
import { IProductInventory } from '@/types/product-inventory-type';
import { IProduct } from '@/types/product-type';
import { ITag } from '@/types/tag-type';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-details-wrapper',
  templateUrl: './product-details-wrapper.component.html',
  styleUrls: ['./product-details-wrapper.component.scss']
})
export class ProductDetailsWrapperComponent {

  @Input() product!: IProduct;
  @Input() isShowBottom: boolean = true;

  textMore = false;

  handleTextToggle() {
    this.textMore = !this.textMore;
  }

  constructor(
    public productService: ProductService,
    public cartService: CartService
  ) {}

  ngOnInit() {}

  capitalizeFirstLetter(inputString: string): string {
    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
  }

  getFirstAvailableInventory(product: IProduct): IProductInventory {
    return product.inventories.find(inv => inv.stockQuantity > 0) || product.inventories[product.inventories.length - 1];
  }

  getFormattedTags(tags: ITag[] | undefined): string {
    return tags?.map(tag => tag.name).join(', ') || '';
  }
}
