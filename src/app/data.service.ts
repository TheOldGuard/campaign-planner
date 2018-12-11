import { Injectable } from '@angular/core';

import { Character } from './models/character.model';
import { Portent }  from './models/portent.model';
import { Danger } from './models/danger.model';
import { Front } from './models/front.model';
import { Campaign } from './models/campaign.model';
import { IStorable, ICampaign } from './models/interfaces.model';
import { PersistenceException } from './models/exceptions/persistence-exception.error';

const PREFIX = 'og_planner';

let debug = false;

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() {
    // if(debug) {
    //   debugService.call(this);
    // }
  }

  getStorable(thing: any): IStorable {
    if (!thing.constructor) {
      return thing;
    }
    let storable = (thing.constructor as any as IStorable);
    if (!storable.key) {
      return thing;
    }
    return storable;
  }

  buildKey(item: any): string {
    let key = item.key || this.getStorable(item).key || undefined;
    if(!key) {
      return undefined;
    }

    return PREFIX + '_' + key;
  }

  save(campaigns: ICampaign[], interval: number, currentAppId: string, testrun?: boolean) {
    let shouldPersist = !testrun;
    
    let lastSaved, appId;
    if (!testrun) { //only do mutex protection if we're not doing a test run
      let fetchedLastSaved = localStorage.getItem(PREFIX + '_' + 'lastSaved');
      let fetchedAppId = localStorage.getItem(PREFIX + '_' + 'appId');

      if (fetchedLastSaved) {
        lastSaved = JSON.parse(fetchedLastSaved);
      }
      if (fetchedAppId) {
        appId = fetchedAppId;
      }
      if (lastSaved && appId) {
        let elapsed = new Date().getTime() - new Date(lastSaved).getTime();
        if (elapsed < interval) {
          console.log('last saved less than ' + (interval/1000) + ' seconds ago. Verifying appid.');
          if (appId && appId !== currentAppId) {
            throw new PersistenceException('Duplicate Instance Detected','There is an instance of this app running in another tab or window.');
          }
        }
      }
    }

    let campaignsSerialized = campaigns.map(c => c.serialize());
    let campaignJSON = JSON.stringify([].concat(...campaignsSerialized.map(c => c.data)));

    let frontsSerialized = [].concat(...campaignsSerialized.map(c => c.fronts));
    let frontJSON = JSON.stringify(frontsSerialized.map(f => JSON.stringify(f)));

    let dangersSerialized = [].concat(...campaignsSerialized.map(c => c.dangers));
    let dangerJSON = JSON.stringify(dangersSerialized.map(d => JSON.stringify(d)));

    let portentsSerialized = [].concat(...campaignsSerialized.map(c => c.portents));
    let portentJSON = JSON.stringify(portentsSerialized.map(p => JSON.stringify(p)));

    let charactersSerialized = [].concat(...campaignsSerialized.map(c => c.cast));
    let characterJSON = JSON.stringify(charactersSerialized.map(c => JSON.stringify(c)));

    if (shouldPersist) {
      localStorage.setItem(PREFIX + '_' + 'lastSaved', JSON.stringify(new Date()));
      localStorage.setItem(PREFIX + '_' + 'appId', currentAppId);
      localStorage.setItem(this.buildKey(Campaign),campaignJSON);
      localStorage.setItem(this.buildKey(Front), frontJSON);
      localStorage.setItem(this.buildKey(Danger), dangerJSON);
      localStorage.setItem(this.buildKey(Portent), portentJSON);
      localStorage.setItem(this.buildKey(Character), characterJSON);
    }

    return {
      campaigns: campaignJSON,
      fronts: frontJSON,
      dangers: dangerJSON,
      portents: portentJSON,
      characters: characterJSON
    };
  }

  setValue(key: string, value: any) {
    let newValue = JSON.stringify(value);
    localStorage.setItem(PREFIX + '_' + key,newValue);
  }

  getValue(key: string) {
    let retrieved = localStorage.getItem(PREFIX + '_' + key);
    return retrieved
      ? JSON.parse(retrieved)
      : undefined;
  }

  export(campaigns: ICampaign[]): string {
    let saved = this.save(campaigns, 30000, 'blah', true);
    return JSON.stringify(saved);
  }

  import(json: string) {
    let parsed = JSON.parse(json);
    return this.load(parsed);
  }

  load(source?: any): ICampaign[] {
    let fetch = source
      ? (c: IStorable) => source[c.key + 's']
      : (c) => localStorage.getItem(this.buildKey(c));
    console.info('Loading data...');

    let fetchedCharacters = fetch(Character);
    let characters = fetchedCharacters 
      ? JSON.parse(fetchedCharacters).map(c => Character.deserialize(c))
      : [];

    let fetchedPortents = fetch(Portent);
    let portents = fetchedPortents
      ? JSON.parse(fetchedPortents).map(p => Portent.deserialize(p))
      : [];

    let fetchedDangers = fetch(Danger);
    let dangers = fetchedDangers
      ? JSON.parse(fetchedDangers).map(d => Danger.deserialize(d, characters, portents))
      : [];

    let fetchedFronts = fetch(Front);
    let fronts = fetchedFronts
      ? JSON.parse(fetchedFronts).map(f => Front.deserialize(f, dangers, characters, portents))
      : [];

    let fetchedCampaigns = fetch(Campaign);
    let campaigns = fetchedCampaigns
      ? JSON.parse(fetchedCampaigns).map(c => Campaign.deserialize(c, fronts, dangers, characters, portents))
      : [];

    console.info('...loaded ' + campaigns.length + ' campaigns');
    return campaigns;
  }
}

function debugService() {
  let char1 = new Character().set({
    name: 'a name',
    hint: 'a hint',
    description: 'a descr',
    notes: 'a notes'
  });

  let char2 = new Character().set({
    name: 'b name',
    hint: 'b hint',
    description: 'b descr',
    notes: 'b notes'
  });

  let char3 = new Character().set({
    name: 'c name',
    hint: 'c hint',
    description: 'c descr',
    notes: 'c notes'
  });

  let char4 = new Character().set({
    name: 'd name',
    hint: 'd hint',
    description: 'd descr',
    notes: 'd notes'
  });

  let port1 = new Portent().set({
    label: 'a label',
    passed: false
  });

  let port2 = new Portent().set({
    label: 'b label',
    passed: false
  });

  let port3 = new Portent().set({
    label: 'c label',
    passed: false
  });

  let port4 = new Portent().set({
    label: 'd label',
    passed: false
  });

  let port5 = new Portent().set({
    label: 'e label',
    passed: false
  });

  let dan1 = new Danger().set({
    name: 'a danger name',
    description: 'a danger description',
    type: 'a danger type',
    impulse: 'a danger impulse',
    cast: [char1],
    portents: [port1,port2],
    impendingDoom: 'a danger doom'
  });

  let dan2 = new Danger().set({
    name: 'b danger name',
    description: 'b danger description',
    type: 'b danger type',
    impulse: 'b danger impulse',
    cast: [char2, char3],
    portents: [port3],
    impendingDoom: 'b danger doom'
  });

  let dan3 = new Danger().set({
    name: 'c danger name',
    description: 'c danger description',
    type: 'c danger type',
    impulse: 'c danger impulse',
    cast: [char4],
    portents: [port4,port5],
    impendingDoom: 'c danger doom'
  });

  let front1 = new Front().set({
    name: 'a front name',
    type: 'a front type',
    description: 'a front description',
    dangers: [dan1,dan2]
  });

  let front2 = new Front().set({
    name: 'b front name',
    type: 'b front type',
    description: 'b front description',
    dangers: [dan3]
  });

  let campaign = new Campaign().set({
    name: 'name',
    description: 'descr',
    fronts: [front1, front2],
    dangers: [dan1, dan2, dan3],
    characters: [char1, char2, char3, char4 ]
  });

  let exported = this.export([campaign]);
  console.log(exported);

  console.log(this.import(exported));
}