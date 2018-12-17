import { Component, Input } from '@angular/core';
import { IStake } from 'src/app/models/interfaces.model';
import { Stake } from 'src/app/models/stake.model';
import { DropEffect, DndDropEvent } from 'ngx-drag-drop';
import { UuidService as uuid } from 'src/app/uuid.service';
import { ModalService } from 'src/app/modal/modal.service';

@Component({
  selector: 'og-stakes-list',
  templateUrl: './stakes-list.component.html',
  styleUrls: ['./stakes-list.component.scss']
})
export class StakesListComponent {

  @Input()
  stakes: IStake[];

  uuid = uuid.fast();

  isModifying: boolean = false;

  isEditing: boolean = false;

  stakeToDelete: IStake;

  constructor(private modalService: ModalService) { }

  toggleEdit() {
    this.isEditing = !this.isEditing;
    this.isModifying = false;
  }

  toggleModifyStakes() {
    this.isModifying = !this.isModifying;
  }

  addStake() {
    let p = new Stake();
    this.stakes.push(p);
  }

  onLabelFocus(stake: IStake) {
    if (stake.question === Stake.defaults().question) {
      stake.question = '';
    }
  }

  onLabelBlur(stake: IStake) {
    if (!stake.question) {
      stake.question = Stake.defaults().question;
    }
  }

  buildModalId() {
    return 'stake-delete-' + this.uuid;
  }

  onDeleteStake(stake: IStake) {
    this.stakeToDelete = stake;
    this.modalService.open(this.buildModalId());
  }

  onDeleteStakeCancel() {
    this.stakeToDelete = undefined;
    this.modalService.close(this.buildModalId());
  }

  onDeleteStakeConfirm() {
    this.stakes = this.stakes.filter(p => p !== this.stakeToDelete);
    this.onDeleteStakeCancel();
  }

  onDeleteStakeClose() {
    this.stakeToDelete = undefined;
  }

  // ---------- DRAG AND DROP HANDLERS --------------
  onDragged( item:any, list:any[], effect:DropEffect ) {
    if( effect === "move" ) {
      const index = list.indexOf( item );
      list.splice( index, 1 );
    }
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
}

