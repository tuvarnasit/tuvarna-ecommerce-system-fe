import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private apiUrl = 'http://localhost:5141/api/v1/sales';

  constructor(private http: HttpClient) { }

  createOrder(data: {
    FirstName: string;
    LastName: string;
    CompanyName?: string;
    Country: string;
    StreetAddress: string;
    Town: string;
    State: string;
    ZipCode: string;
    Email: string;
    PhoneNumber: string;
    OrderNotes?: string;
    DiscountPercentage?: number;
    Items: Array<{ QuantitySold: number; ProductId: number; }>
  }) {
    return this.http.post(this.apiUrl, data);
  }
}
