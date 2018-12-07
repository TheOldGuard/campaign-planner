import { Component, Input, Output, EventEmitter } from '@angular/core';

import { ModalService } from '../modal/modal.service';
import { ICampaign } from '../models/interfaces.model';

@Component({
  selector: 'og-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent {

  @Input()
  data: any;

  @Output('autosave')
  private emitAutosave: EventEmitter<boolean> = new EventEmitter();

  @Output('import')
  private emitImport: EventEmitter<ICampaign[]> = new EventEmitter();

  @Output('save')
  private emitSave: EventEmitter<any> = new EventEmitter();

  open: boolean = false;

  constructor(private modalService: ModalService) { }

  toggle() {
    this.open = !this.open;
    if (this.open) {
      this.modalService.open('config-modal');
    } else {
      this.modalService.close('config-modal');
    }
  }

  onAutosaveChange() {
    this.emitAutosave.emit(this.data.config.autosave);
  }

  onImport(campaigns: ICampaign[]) {
    this.emitImport.emit(campaigns);
    console.log('import caught in config',campaigns);
  }

  onSave() {
    this.emitSave.emit();
  }

}
