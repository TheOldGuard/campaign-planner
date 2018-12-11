import { Component, Input, ViewChild, ElementRef, OnDestroy, Output, EventEmitter, OnInit } from '@angular/core';

import { DropEffect, DndDropEvent } from 'ngx-drag-drop';

import { IFront, IDanger, ICharacter } from 'src/app/models/interfaces.model';
import { Front } from 'src/app/models/front.model';
import { ModalService } from 'src/app/modal/modal.service';
import { Danger } from 'src/app/models/danger.model';
import { EntityDataChangeService, EntityDataChangeEvent } from 'src/app/messaging.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'og-front',
  templateUrl: './front.component.html',
  styleUrls: ['./front.component.scss']
})
export class FrontComponent implements OnInit, OnDestroy{

  @Input()
  front: IFront;

  @Input()
  dangers: IDanger[];

  @Input()
  characters: ICharacter[];

  @ViewChild('panel')
  panel: ElementRef;

  selectedDangerToAdd: number;
  dangerToRemove: IDanger;

  subscription: Subscription;

  isEditing: boolean = false;
  isModifying: boolean = false;

  isOpen: boolean = false;
  heightFixer: number;

  constructor(private modalService: ModalService, private dataChangeService: EntityDataChangeService) { }

  onDataChange(evt: EntityDataChangeEvent) {
    if (evt.entity === 'danger' && evt.action === 'remove') {
      // this.front.dangers = this.front.dangers.filter(d => d.uuid !== (<IDanger>evt.data).uuid);
    }
  }

  onFieldFocus(field) {
    if (this.isDefault(field)) {
      this.front[field] = '';
    }
  }

  onFieldBlur(field) {
    if (!this.front[field]){
      this.front[field] = Front.defaults()[field];
    }
  }

  isDefault(field) {
    return Front.defaults()[field] === this.front[field];
  }

  toggleEditing() {
    this.isEditing = !this.isEditing;
  }

  toggleModifying() {
    this.isModifying = !this.isModifying;
  }

  toggleOpen() {
    this.isOpen = !this.isOpen;
    this.isEditing = false;
    let panel = this.panel.nativeElement;
    if (this.isOpen) {
      let newHeight = panel.scrollHeight + 'px';
      panel.style.maxHeight = panel.scrollHeight + 'px';
      this.heightFixer = window.setInterval(() => {
        panel.style.maxHeight = panel.scrollHeight + 'px';
      },100);
    } else {
      window.clearInterval(this.heightFixer);
      panel.style.maxHeight = '0';
    }
  }

  buildModalId(id: string) {
    return id + '-' + this.front.uuid;
  }

  onAddDanger() {
    this.modalService.open(this.buildModalId('danger-select'));
  }

  onAddDangerCancel() {
    this.selectedDangerToAdd = undefined;
    this.modalService.close(this.buildModalId('danger-select'));
  }

  onAddDangerSelect() {
    if (this.selectedDangerToAdd !== undefined) {
      let newDanger = this.getFilteredDangers()[this.selectedDangerToAdd];
      if (this.front.dangers.indexOf(newDanger) < 0) {
        this.front.dangers.push(newDanger);
      }
      this.onAddDangerCancel();
    }
  }

  onAddDangerNew() {
    let d = new Danger();
    this.front.dangers.push(d);
    this.dataChangeService.sendMessage({entity: 'danger', action: 'add', data: d});
    this.onAddDangerCancel();
  }


  onDangerRemoveClick(danger: IDanger) {
    this.dangerToRemove = danger;
    this.modalService.open(this.buildModalId('danger-remove'));
  }

  onDangerRemoveCancel() {
    this.modalService.close(this.buildModalId('danger-remove'));
  }

  onDangerRemoveHere() {
    this.front.dangers = this.front.dangers.filter(d => d.uuid !== this.dangerToRemove.uuid);
    this.onDangerRemoveCancel();
  }

  onDangerRemoveAll() {
    this.dataChangeService.sendMessage({entity: 'danger', action: 'remove', data: this.dangerToRemove});
    this.onDangerRemoveHere();
  }

  getFilteredDangers() {
    return this.dangers.filter(d => this.front.dangers.indexOf(d) < 0);
  }

  onDragged( item:any, list:any[], effect:DropEffect) {
    if( effect === "move" ) {
      const index = list.indexOf( item );
      list.splice( index, 1 );
    }
  }

  onDragEnd( event:DragEvent ) {
  }

  onDrop( event:DndDropEvent, list?:any[] ) {
    if( list
      && (event.dropEffect === "copy"
        || event.dropEffect === "move") ) {

      let index = event.index;

      if( typeof index === "undefined" ) {

        index = list.length;
      }

      list.splice( index, 0, event.data );
    }
  }

  ngOnInit() {
    this.subscription = this.dataChangeService.observable().subscribe(e => {
      this.onDataChange(e);
    });
  }

  ngOnDestroy() {
    if (this.heightFixer !== undefined) {
      window.clearInterval(this.heightFixer);
    }
  
  }


}
