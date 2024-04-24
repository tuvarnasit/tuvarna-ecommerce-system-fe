import feature_data from '@/data/feature-data';
import { IFeature } from '@/types/feature-type';
import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.scss']
})
export class FeatureComponent {

  public feature_items:IFeature[] = feature_data;

  constructor(private sanitizer: DomSanitizer) {}

  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
