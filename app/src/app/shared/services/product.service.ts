import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProductAll } from '@/types/product-all-type'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl: string = 'http://localhost:5141/api/v1/products';

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<IProductAll> {
    return this.http.get<IProductAll>(this.baseUrl);
  }

  getByCategoryName(name: string): Observable<IProductAll> {
    return this.http.get<IProductAll>(`${this.baseUrl}/category/${name}`);
  }
}
