import { Component } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent {

  public isActive: string = '';

  handleActive = (type: string) => {
    if (type === this.isActive) {
      this.isActive = '';
    } else {
      this.isActive = type;
    }
  };
}
