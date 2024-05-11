import { IProduct } from '@/types/product-type';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {

  @Input() products: IProduct[] = [];
  @Input() paginate: any = {};

  @Output() setPage: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  pageSet(page: number) {
    this.setPage.emit(page);
  }
}
