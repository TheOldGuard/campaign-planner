import { Component, OnInit, OnDestroy } from '@angular/core';

import { DataService } from './data.service';
import { ICampaign } from './models/interfaces.model';
import { Campaign } from './models/campaign.model';
import { ModalService } from './modal/modal.service';
import { DropEffect, DndDropEvent } from 'ngx-drag-drop';

interface AppData {
  campaigns: ICampaign[];
  config: {
    autosave: boolean;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  interval: number;

  data: AppData = {
    campaigns: [],
    config: {
      autosave: true
    }
  };

  selectedCampaign: ICampaign;

  constructor(private dataService: DataService, private modalService: ModalService) {
    this.data.campaigns = this.dataService.load();
    let autosave = this.dataService.getValue('og_planner_autosave');
    this.data.config.autosave = autosave !== undefined ? autosave : this.data.config.autosave;
  }

  selectCampaign(campaign: ICampaign) {
    this.selectedCampaign = campaign;
  }

  addCampaign() {
    let c = new Campaign();
    this.data.campaigns.push(c);
  }

  onImport(campaigns: ICampaign[]) {
    this.data.campaigns = campaigns;
    console.log(campaigns);
  }

  onSave() {
    this.dataService.save(this.data.campaigns);
  }

  ngOnInit() {
    this.interval = window.setInterval(() => {
      if (this.data.config.autosave) {
        this.dataService.save(this.data.campaigns);
      }
    }, 30000);
  }

  onAutosaveChange() {
    this.dataService.setValue('og_planner_autosave',this.data.config.autosave);
  }
}
