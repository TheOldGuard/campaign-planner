import { Component, Input } from '@angular/core';
import { IPortent } from 'src/app/models/interfaces.model';
import { Portent } from 'src/app/models/portent.model';
import { DropEffect, DndDropEvent } from 'ngx-drag-drop';

@Component({
  selector: 'og-portent-list',
  templateUrl: './portent-list.component.html',
  styleUrls: ['./portent-list.component.scss']
})
export class PortentListComponent {

  @Input()
  portents: IPortent[];

  isModifying: boolean = false;

  isEditing: boolean = false;

  constructor() { }

  toggleEdit() {
    this.isEditing = !this.isEditing;
    this.isModifying = false;
  }

  toggleModifyPortents() {
    this.isModifying = !this.isModifying;
  }

  addPortent() {
    let p = new Portent();
    this.portents.push(p);
  }

  onLabelFocus(portent: IPortent) {
    if (portent.label === Portent.defaults().label) {
      portent.label = '';
    }
  }

  onLabelBlur(portent: IPortent) {
    if (!portent.label) {
      portent.label = Portent.defaults().label;
    }
  }

  onDeletePortent(portent: IPortent) {
    let i = this.portents.indexOf(portent);
    this.portents.splice(i,1);
  }

  // ---------- DRAG AND DROP HANDLERS --------------
  onDragged( item:any, list:any[], effect:DropEffect ) {
    if( effect === "move" ) {
      const index = list.indexOf( item );
      list.splice( index, 1 );
    }
  }

  onDrop( event:DndDropEvent, list?:any[] ) {
    console.log(event,list);
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
}
