import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { ContenteditableModule } from 'ng-contenteditable';
import { DndModule } from "ngx-drag-drop";

import { AppComponent } from './app.component';
import { FileComponent } from './file/file.component';
import { ExportComponent } from './file/export/export.component';
import { ImportComponent } from './file/import/import.component';
import { ToggleComponent } from './form/toggle/toggle.component';
import { ConfigComponent } from './config/config.component';
import { CampaignComponent } from './campaign/campaign.component';
import { FrontComponent } from './campaign/front/front.component';
import { ModalComponent } from './modal/modal.component';
import { DangerComponent } from './campaign/danger/danger.component';
import { PortentListComponent } from './campaign/danger/portent-list/portent-list.component';
import { CharacterComponent } from './campaign/character/character.component';
import { EntityDataChangeService } from './messaging.service';
import { StakesListComponent } from './campaign/stakes-list/stakes-list.component';

@NgModule({
  declarations: [
    AppComponent,
    FileComponent,
    ExportComponent,
    ImportComponent,
    ToggleComponent,
    ConfigComponent,
    CampaignComponent,
    FrontComponent,
    ModalComponent,
    DangerComponent,
    PortentListComponent,
    CharacterComponent,
    StakesListComponent
  ],
  imports: [
    BrowserModule,
    ContenteditableModule,
    DndModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
