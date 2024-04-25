import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  @Input() style_2: Boolean = false;
  @Input() primary_style: Boolean = false;
  @Input() style_3: Boolean = false;

  getYear() {
    return new Date().getFullYear();
  }
}

