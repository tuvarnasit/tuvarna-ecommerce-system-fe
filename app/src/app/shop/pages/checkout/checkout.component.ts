import { CartService } from '@/shared/services/cart.service';
import { CheckoutService } from '@/shared/services/checkout.service';
import { UserService } from '@/shared/services/user.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {

  isOpenCoupon = false;
  shipCost: number = 0;
  couponCode: string = '';
  payment_name: string = '';
  discountPercent: number = 0;
  public checkoutForm!: FormGroup;
  public formSubmitted = false;
  isLoggedIn = false;
  userEmail: string = '';

  constructor(
    public cartService: CartService,
    private checkoutService: CheckoutService,
    private toastrService: ToastrService,
    public userService: UserService,
    private router: Router
  ) { }

  handleOpenLogin() {
    this.router.navigate(['/pages/login']);
  }

  handleOpenCoupon() {
    this.isOpenCoupon = !this.isOpenCoupon;
  }

  handleShippingCost(value: number | string) {
    if (value === 'free') {
      this.shipCost = 0;
    } else {
      this.shipCost = value as number;
    }
  }

  public countrySelectOptions = [
    { value: '', text: 'Избери държава' },
    { value: 'bulgaria', text: 'България' },
  ];

  changeHandler(selectedOption: { value: string; text: string }) {
    console.log('Selected option:', selectedOption);

    this.checkoutForm.patchValue({
      country: selectedOption.value
    });
  }

  handleCouponSubmit() {
    if (this.couponCode === 'TUVARNA15') {
      this.discountPercent = 15;
    } else {
      this.discountPercent = 0;
    }
    this.couponCode = '';
  }

  getTotalPrice(): number {
    const subtotal = this.cartService.totalPriceQuantity().total;
    const discount = this.discountPercent / 100 * subtotal;
    return subtotal - discount + this.shipCost;
  }

  handlePayment(value: string) {
    this.payment_name = value
  }

  ngOnInit() {
    this.isLoggedIn = this.userService.isLoggedIn();
    if (this.isLoggedIn) {
      const jwtPayload = this.userService.decodeJWT();
      if (jwtPayload) {
        this.userEmail = jwtPayload.email;
      }
    }
    console.log(this.userEmail)
    this.initializeForm();
  }

  private initializeForm() {
    this.checkoutForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      company: new FormControl(null),
      country: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      state: new FormControl(null, Validators.required),
      zipCode: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      orderNote: new FormControl(null),
      email: new FormControl(null, [Validators.required, Validators.email]),
      payment: new FormControl(null, Validators.required),
      shipping: new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.checkoutForm.valid) {
      const formValue = this.checkoutForm.value;
      console.log(formValue)
      const items = this.cartService.getCartProducts().map(product => ({
        ProductId: product.id,
        QuantitySold: product.orderQuantity || 0
      }));
      const orderData = {
        FirstName: formValue.firstName,
        LastName: formValue.lastName,
        CompanyName: formValue.company,
        Country: formValue.country,
        StreetAddress: formValue.address,
        Town: formValue.city,
        State: formValue.state,
        ZipCode: formValue.zipCode,
        Email: formValue.email,
        PhoneNumber: formValue.phone,
        OrderNotes: formValue.orderNote,
        DiscountPercentage: this.discountPercent,
        PaymentType: formValue.payment,
        ShippingType: formValue.shipping,
        Items: items,
        CustomerEmail: this.userEmail
      };
      this.checkoutService.createOrder(orderData).subscribe({
        next: (response) => {
          this.toastrService.success('Order successfully placed');
          this.checkoutForm.reset();
          this.formSubmitted = false;
          this.cartService.clear_cart(false);
        },
        error: (error) => {
          this.toastrService.error('Failed to place order');
        }
      });
    } else {
      this.toastrService.error('Please fill out all required fields');
    }
  }

  get firstName() { return this.checkoutForm.get('firstName') }
  get lastName() { return this.checkoutForm.get('lastName') }
  get company() { return this.checkoutForm.get('company') }
  get country() { return this.checkoutForm.get('country') }
  get address() { return this.checkoutForm.get('address') }
  get city() { return this.checkoutForm.get('city') }
  get state() { return this.checkoutForm.get('state') }
  get zipCode() { return this.checkoutForm.get('zipCode') }
  get phone() { return this.checkoutForm.get('phone') }
  get orderNote() { return this.checkoutForm.get('orderNote') }
  get email() { return this.checkoutForm.get('email') }
  get payment() { return this.checkoutForm.get('payment') }
  get shipping() { return this.checkoutForm.get('shipping') }
}
