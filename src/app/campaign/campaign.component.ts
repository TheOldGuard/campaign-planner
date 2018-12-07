import { Component, Input } from '@angular/core';

import { ICampaign } from '../models/interfaces.model';
import { Campaign } from '../models/campaign.model';

@Component({
  selector: 'og-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.scss']
})
export class CampaignComponent {

  @Input()
  private campaign: ICampaign;

  constructor() { }

  onFieldFocus(field) {
    if (this.isDefault(field)) {
      this.campaign[field] = '';
    }
  }

  onFieldBlur(field) {
    if (!this.campaign[field]){
      this.campaign[field] = Campaign.defaults()[field];
    }
  }


  isDefault(field) {
    return Campaign.defaults()[field] === this.campaign[field];
  }
}
