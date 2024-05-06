import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { CartService } from '@/shared/services/cart.service';
import { UtilsService } from '@/shared/services/utils.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public niceSelectOptions = [
    { value: '', text: 'Нови категории' },
  ];
  public searchText: string = '';
  public productType: string = '';
  isLoggedIn = false;
  userName: string = '';

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    public cartService: CartService,
    public utilsService: UtilsService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.isLoggedIn = this.userService.isLoggedIn();
    if (this.isLoggedIn) {
      const jwtPayload = this.userService.decodeJWT();
      if (jwtPayload) {
        this.userName = `Здравей, ${jwtPayload.sub}`;
      }
    }
    this.loadCategories();
  }

  headerSticky: boolean = false;

  @HostListener('window:scroll', ['$event']) onscroll() {
    if (window.scrollY > 80) {
      this.headerSticky = true;
    } else {
      this.headerSticky = false;
    }
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        const sortedCategories = data.categories
          .sort((a: any, b: any) => b.id - a.id)
          .slice(0, 4);
        this.niceSelectOptions = this.niceSelectOptions.concat(
          sortedCategories.map((item: any) => ({
            value: item.name,
            text: this.capitalizeFirstLetter(item.name)
          }))
        );
      },
      error: (error) => {
        console.error('Error fetching categories', error);
      }
    });
  }


  capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  handleSearchSubmit() {
    const queryParams: { [key: string]: string | null } = {};
    if (!this.searchText && !this.productType) {
      return
    }
    else {
      if (this.searchText) {
        queryParams['searchText'] = this.searchText;
      }
      if (this.productType) {
        queryParams['productType'] = this.productType;
      }
      this.router.navigate(['/pages/search'], { queryParams });
    }
  }

  changeHandler(selectedOption: { value: string; text: string }) {
    this.productType = selectedOption.value;
  }
}
