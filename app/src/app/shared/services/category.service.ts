import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl: string = 'http://localhost:5141/api/v1/categories';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
}
