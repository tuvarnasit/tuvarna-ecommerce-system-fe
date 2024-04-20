import { Component, HostListener } from '@angular/core';
import { CartService } from '@/shared/services/cart.service';
import { WishlistService } from '@/shared/services/wishlist.service';
import { Router } from '@angular/router';
import { UtilsService } from '@/shared/services/utils.service';

@Component({
  selector: 'app-header-one',
  templateUrl: './header-one.component.html',
  styleUrls: ['./header-one.component.scss'],
})
export class HeaderOneComponent {
  public searchText: string = '';
  public productType: string = '';
  public headerSticky: boolean = false;

  constructor(
    public cartService: CartService,
    public wishlistService: WishlistService,
    public utilsService: UtilsService,
    private router: Router
  ) {}

  // select options for header category
  public niceSelectOptions = [
    { value: 'select-category', text: 'Select Category' },
    { value: 'computer', text: 'Computers' },
    { value: 'phone', text: 'Phones' },
    { value: 'smartWatches', text: 'Smart watches' },
    { value: 'peripheries', text: 'Peripheries' },
  ];

  changeHandler(selectedOption: { value: string; text: string }) {
    console.log('Selected option:', selectedOption);
    this.productType = selectedOption.value;
  }

  @HostListener('window:scroll', ['$event'])
  onscroll() {
    if (window.scrollY > 80) {
      this.headerSticky = true;
    } else {
      this.headerSticky = false;
    }
  }

  handleSearchSubmit() {
    const queryParams: { [key: string]: string | null } = {};
    if (!this.searchText && !this.productType) {
      return;
    } else {
      if (this.searchText) {
        queryParams['searchText'] = this.searchText;
      }
      if (this.productType) {
        queryParams['productType'] = this.productType;
      }
      this.router.navigate(['/pages/search'], { queryParams });
    }
  }
}
