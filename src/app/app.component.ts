import { Component, OnInit, OnDestroy } from '@angular/core';

import { DataService } from './data.service';
import { ICampaign } from './models/interfaces.model';
import { Campaign } from './models/campaign.model';
import { ModalService } from './modal/modal.service';
import { DropEffect, DndDropEvent } from 'ngx-drag-drop';
import { UuidService as uuid } from './uuid.service';
import { PersistenceException } from './models/exceptions/persistence-exception.error';

interface AppData {
  campaigns: ICampaign[];
  config: {
    autosave: boolean;
    autosaveLocked?: boolean;
  }
}

// const INTERVAL = 30000; // autosave interval - 30 seconds
const INTERVAL = 10000; // autosave interval - 30 seconds

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  interval: number;
  uuid: string = uuid.fast();

  persistenceException: PersistenceException;

  data: AppData = {
    campaigns: [],
    config: {
      autosave: true
    }
  };

  selectedCampaign: ICampaign;

  constructor(private dataService: DataService, private modalService: ModalService) {
    this.data.campaigns = this.dataService.load();
    let autosave = this.dataService.getValue('autosave');
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
    try {
      this.dataService.save(this.data.campaigns, INTERVAL, this.uuid);
    } catch (e) {
      if (!this.persistenceException) {
        this.persistenceException = e;
        this.modalService.open('persistence-error');
        window.clearInterval(this.interval);
        this.data.config.autosave = false;
        this.data.config.autosaveLocked = true;
      }
    }
  }

  ngOnInit() {
    console.log('app loaded',this);
    this.interval = window.setInterval(() => {
      if (this.data.config.autosave) {
        this.onSave();
      }
    }, INTERVAL);
  }

  onAutosaveChange() {
    this.dataService.setValue('autosave',this.data.config.autosave);
  }
}
