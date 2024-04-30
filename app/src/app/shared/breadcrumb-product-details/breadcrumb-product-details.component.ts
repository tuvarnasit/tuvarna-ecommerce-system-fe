import { IProduct } from '@/types/product-type';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-breadcrumb-product-details',
  templateUrl: './breadcrumb-product-details.component.html',
  styleUrls: ['./breadcrumb-product-details.component.scss']
})
export class BreadcrumbProductDetailsComponent {
  
  @Input () product!:IProduct

  capitalizeFirstLetter(inputString: string): string {
    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
  }
}
