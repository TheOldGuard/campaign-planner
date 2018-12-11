import { Component, Input, OnInit, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { ICharacter } from 'src/app/models/interfaces.model';
import { Character } from 'src/app/models/character.model';

@Component({
  selector: 'og-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit, OnDestroy {

  @Input()
  private character: ICharacter;

  private isOpen: boolean = false;
  private isEditing: boolean = false;

  @ViewChild('panel')
  private panel: ElementRef;
  private heightFixer: number;

  constructor() { }

  toggleEditing() {
    this.isEditing = !this.isEditing;
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

  isDefault(field) {
    return this.character[field] === Character.defaults()[field];
  }

  onFieldFocus(field) {
    if (this.character[field] == Character.defaults()[field]) {
      this.character[field] = '';
    }
  }

  onFieldBlur(field) {
    if (!this.character[field]){
      this.character[field] = Character.defaults()[field];
    }
  }

  ngOnInit() {}

  ngOnDestroy() {
    if (this.heightFixer !== undefined) {
      window.clearInterval(this.heightFixer);
    }
  }
}
