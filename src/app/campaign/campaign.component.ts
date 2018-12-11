import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { DropEffect, DndDropEvent } from 'ngx-drag-drop';

import { ICampaign, IDanger, IFront, ICharacter } from '../models/interfaces.model';
import { Campaign } from '../models/campaign.model';
import { Front } from '../models/front.model';
import { Danger } from '../models/danger.model';
import { ModalService } from '../modal/modal.service';
import { Character } from '../models/character.model';
import { EntityDataChangeService, EntityDataChangeEvent } from '../messaging.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'og-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.scss']
})
export class CampaignComponent implements OnInit, OnDestroy {

  @Input()
  private campaign: ICampaign;

  // private currentTab = 'fronts';
  private currentTab = 'fronts';
  private isEditing: boolean = false;

  private subscription: Subscription ;

  private disableDrag: boolean = true;

  private deletingFront: IFront;
  private deletingCharacter: ICharacter;
  private deletingDanger: IDanger;

  constructor(private modalService: ModalService, private dataChangeService: EntityDataChangeService) { }

  selectTab(newTab: string) {
    this.currentTab = newTab;
    this.disableDrag = true;
  }

  toggleModify() {
    this.disableDrag = !this.disableDrag;
  }

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

  toggleEditing() {
    this.isEditing = !this.isEditing;
  }

  // ---------- DRAG AND DROP HANDLERS --------------
  onDragged( item:any, list:any[], effect:DropEffect ) {
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


  // ------------- FRONT HANDLERS --------------
  newFront() {
    let front = new Front();
    this.campaign.fronts.push(front);
  }

  onDeleteFrontClick(front: IFront) {
    this.deletingFront = front;
    this.modalService.open('front-delete-confirm');
  }

  onDeleteFrontConfirm() {
    console.log('delete confirmed:',this.deletingFront);
    this.campaign.fronts = this.campaign.fronts.filter(d => d !== this.deletingFront);
    this.deletingFront = undefined;
    this.modalService.close('front-delete-confirm');
  }

  onDeleteFrontCancel() {
    this.deletingFront = undefined;
    this.modalService.close('front-delete-confirm');
  }

  // ------------- CHARACTER HANDLERS --------------
  newCharacter() {
    let character = new Character();
    this.campaign.characters.push(character);
  }

  isDefaultHint(hint) {
    return hint === Character.defaults().hint;
  }

  onDeleteCharacterClick(character: ICharacter) {
    this.deletingCharacter = character;
    this.modalService.open('character-delete-confirm');
  }

  onDeleteCharacterConfirm() {
    this.campaign.removeCharacter(this.deletingCharacter);
    this.deletingCharacter = undefined;
    this.modalService.close('character-delete-confirm');
  }

  onDeleteCharacterCancel() {
    this.deletingCharacter = undefined;
    this.modalService.close('character-delete-confirm');
  }

  // ------------- DANGER HANDLERS --------------
  newDanger() {
    let danger = new Danger();
    this.campaign.dangers.push(danger);
  }

  onDeleteDangerClick(danger: IDanger) {
    this.deletingDanger = danger;
    this.modalService.open('danger-delete-confirm');
  }

  onDeleteDangerConfirm() {
    this.campaign.removeDanger(this.deletingDanger);
    this.deletingDanger = undefined;
    this.modalService.close('danger-delete-confirm');
  }

  onDeleteDangerCancel() {
    this.deletingDanger = undefined;
    this.modalService.close('danger-delete-confirm');
  }

  onDataChange(evt: EntityDataChangeEvent) {
    if (evt.entity === 'danger') {
      if (evt.action === 'add') {
        this.campaign.dangers.push(<IDanger>(evt.data));
      } else if (evt.action === 'remove') {
        this.deletingDanger = <IDanger>(evt.data);
        this.onDeleteDangerConfirm();
      }
    } else if(evt.entity === 'character') {
      let c = <ICharacter>(evt.data);
      if (evt.action === 'add') {
        this.campaign.characters.push(c);
      } else if (evt.action === 'remove') {
        this.deletingCharacter = c;
        this.onDeleteCharacterConfirm();
      }
    }
  }

  ngOnInit() {
    this.subscription = this.dataChangeService.observable().subscribe(e => {
      this.onDataChange(e);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
