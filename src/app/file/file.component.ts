import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { ICampaign } from '../models/interfaces.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'og-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit, OnDestroy {

  @Input('campaigns')
  campaigns: ICampaign[];

  @Output('import')
  emitter: EventEmitter<ICampaign[]> = new EventEmitter();

  @Output('save')
  saveEmitter: EventEmitter<any> = new EventEmitter();

  constructor() { }

  onImport(data: ICampaign[]) {
    this.emitter.emit(data);
  }

  emitSave() {
    this.saveEmitter.emit();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

}
