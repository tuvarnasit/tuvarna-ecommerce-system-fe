import { UserService } from '@/shared/services/user.service';
import { ICustomer } from '@/types/customer-type';
import { ISale } from '@/types/sale-type';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  customer!: ICustomer;
  welcomeMessage: string = '';
  salesCount: number = 0;
  username = 's'

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const username = params.get('username');
      if (username) {
        this.userService.getCustomerByUsername(username).subscribe({
          next: (customer) => {
            this.customer = customer;
            this.welcomeMessage = `Добре дошли, ${customer.username}!`;
            this.salesCount = customer.sales.length;
          },
          error: (error) => {
            console.error('Error fetching customer data:', error);
          }
        });
      } else {
        console.error('No username provided in route');
      }
    });
  }

  getProductList(sale: ISale): string {
    return sale.items.map(item => `${item.productName} x ${item.quantitySold}`).join(', ');
  }

  getTotal(sale: ISale): number {
    return sale.items.reduce((total, item) => total + (item.totalPrice || 0), 0);
  }

  logout() {
    localStorage.removeItem('jwtToken');
    this.router.navigate(['/home']);
  }

}
