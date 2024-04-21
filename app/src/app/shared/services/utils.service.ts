import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  public openMobileMenus: Boolean = false;

  constructor() { }

  handleOpenMobileMenu () {
    this.openMobileMenus = !this.openMobileMenus;
  };
}
