import { ProductService } from '@/shared/services/product.service';
import { IProduct } from '@/types/product-type';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {

  public product: IProduct | null | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}
  
  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => {
        const productId = params.get('id');
        if (productId) {
          return this.productService.getById(productId);
        }
        return of(null);
      })
    ).subscribe({
      next: (product: IProduct | null) => {
        this.handleProductResponse(product);
      },
      error: (error) => {
        console.error('Error fetching product:', error);
        this.router.navigate(['/error']);
      }
    });
  }

  private handleProductResponse(product: IProduct | null): void {
    if (!product || !product.inventories || product.inventories.length == 0) {
      this.router.navigate(['/404']);
    } else {
      this.product = product;
    }
  }

  capitalizeFirstLetter(inputString: string): string {
    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
  }
}
