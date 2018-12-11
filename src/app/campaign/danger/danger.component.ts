import { Component, Input, OnInit, ViewChild, OnDestroy, ElementRef, Output, EventEmitter } from '@angular/core';
import { IDanger, ICharacter } from '../../models/interfaces.model';
import { Danger } from '../../models/danger.model';
import { Portent } from 'src/app/models/portent.model';
import { ModalService } from 'src/app/modal/modal.service';
import { Character } from 'src/app/models/character.model';
import { EntityDataChangeService } from 'src/app/messaging.service';
import { Subscription } from 'rxjs';
import { DropEffect, DndDropEvent } from 'ngx-drag-drop';

@Component({
  selector: 'og-danger',
  templateUrl: './danger.component.html',
  styleUrls: ['./danger.component.scss']
})
export class DangerComponent implements OnInit, OnDestroy {

  @Input()
  private danger: IDanger;

  @Input()
  private characters: ICharacter[];

  @Input('active')
  private isOpen: boolean = false;

  @ViewChild('panel')
  private panel: ElementRef;

  private subscription: Subscription;

  private isEditing: boolean = false;
  private heightFixer: number;

  private selectedCharacterToAdd: number;
  private characterToRemove: ICharacter;

  private isModifyingPortents: boolean = false;
  private isModifyingCharacters: boolean = false;

  constructor(private modalService: ModalService, private dataChangeService: EntityDataChangeService) { }

  onFieldFocus(field) {
    if (this.isDefault(field)) {
      this.danger[field] = '';
    }
  }

  onFieldBlur(field) {
    if (!this.danger[field]){
      this.danger[field] = Danger.defaults()[field];
    }
  }

  isDefault(field) {
    return Danger.defaults()[field] === this.danger[field];
  }

  toggleEditing() {
    this.isEditing = !this.isEditing;
  }

  toggleOpen() {
    this.isOpen = !this.isOpen;
    this.isEditing = false;
    let panel = this.panel.nativeElement;
    if (this.isOpen) {
      panel.style.maxHeight = panel.scrollHeight + 'px';
      this.heightFixer = window.setInterval(() => {
        panel.style.maxHeight = panel.scrollHeight + 'px';
      },100);
    } else {
      window.clearInterval(this.heightFixer);
      panel.style.maxHeight = '0';
    }
  }

  addPortent() {
    let p = new Portent();
    this.danger.portents.push(p);
  }

  toggleModifyPortents() {
    this.isModifyingPortents = !this.isModifyingPortents;
  }

  toggleModifyCharacters() {
    this.isModifyingCharacters = !this.isModifyingCharacters;
  }

  getFilteredCharacters() {
    return this.characters? this.characters.filter(c => this.danger.cast.indexOf(c) < 0) : [];
  }

  isDefaultHint(char: ICharacter) {
    return char.hint === Character.defaults().hint;
  }

  buildModalId(modalId: string) {
    return modalId + '-' + this.danger.uuid;
  }

  onAddCharacter() {
    this.modalService.open(this.buildModalId('character-select'));
  }

  onAddCharacterCancel() {
    this.selectedCharacterToAdd = undefined;
    this.modalService.close(this.buildModalId('character-select'));
  }

  onAddCharacterSelect() {
    if (this.selectedCharacterToAdd !== undefined) {
      let newCharacter = this.getFilteredCharacters()[this.selectedCharacterToAdd];
      if (this.danger.cast.indexOf(newCharacter) < 0) {
        this.danger.cast.push(newCharacter);
      }
      this.onAddCharacterCancel();
    }
  }

  onAddCharacterNew() {
    let newCharacter = new Character();
    this.danger.cast.push(newCharacter);
    this.dataChangeService.sendMessage({entity: 'character',action:'add', data: newCharacter});
    this.onAddCharacterCancel();
  }

  onCharacterRemoveClick(character: ICharacter) {
    this.characterToRemove = character;
    this.modalService.open(this.buildModalId('character-remove'));
  }

  onCharacterRemoveCancel() {
    this.modalService.close(this.buildModalId('character-remove'));
  }

  onCharacterRemoveHere() {
    this.danger.cast = this.danger.cast.filter(d => d.uuid !== this.characterToRemove.uuid);
    this.onCharacterRemoveCancel();
  }

  onCharacterRemoveAll() {
    this.dataChangeService.sendMessage({entity: 'character', action: 'remove', data: this.characterToRemove});
    this.onCharacterRemoveHere();
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
    if (this.isOpen) {
      this.toggleOpen();
      this.toggleOpen();
    }
    this.subscription = this.dataChangeService.observable().subscribe(e => {
      if (e.entity === 'character' && e.action === 'remove') {
        // this.danger.cast = this.danger.cast.filter(c => c.uuid !== (<ICharacter>e.data).uuid);
      }
    });
  }

  ngOnDestroy() {
    if (this.heightFixer !== undefined) {
      window.clearInterval(this.heightFixer);
    }
    this.subscription.unsubscribe();
  }

}
