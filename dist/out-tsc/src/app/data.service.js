"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var character_model_1 = require("./models/character.model");
var portent_model_1 = require("./models/portent.model");
var danger_model_1 = require("./models/danger.model");
var front_model_1 = require("./models/front.model");
var campaign_model_1 = require("./models/campaign.model");
var PREFIX = 'og_planner';
var debug = false;
var DataService = /** @class */ (function () {
    function DataService() {
        if (debug) {
            debugService.call(this);
        }
    }
    DataService.prototype.getStorable = function (thing) {
        if (!thing.constructor) {
            return thing;
        }
        var storable = thing.constructor;
        if (!storable.key) {
            return thing;
        }
        return storable;
    };
    DataService.prototype.buildKey = function (item) {
        var key = item.key || this.getStorable(item).key || undefined;
        if (!key) {
            return undefined;
        }
        return PREFIX + '_' + key;
    };
    DataService.prototype.save = function (campaigns) {
        localStorage.setItem(PREFIX + '_' + 'lastSaved', JSON.stringify(new Date()));
        var campaignsSerialized = campaigns.map(function (c) { return c.serialize(); });
        var campaignJSON = JSON.stringify([].concat.apply([], campaignsSerialized.map(function (c) { return c.data; })));
        localStorage.setItem(this.buildKey(campaign_model_1.Campaign), campaignJSON);
        var frontsSerialized = [].concat.apply([], campaignsSerialized.map(function (c) { return c.fronts; }));
        var frontJSON = JSON.stringify(frontsSerialized.map(function (f) { return JSON.stringify(f); }));
        localStorage.setItem(this.buildKey(front_model_1.Front), frontJSON);
        var dangersSerialized = [].concat.apply([], campaignsSerialized.map(function (c) { return c.dangers; }));
        var dangerJSON = JSON.stringify(dangersSerialized.map(function (d) { return JSON.stringify(d); }));
        localStorage.setItem(this.buildKey(danger_model_1.Danger), dangerJSON);
        var portentsSerialized = [].concat.apply([], campaignsSerialized.map(function (c) { return c.portents; }));
        var portentJSON = JSON.stringify(portentsSerialized.map(function (p) { return JSON.stringify(p); }));
        localStorage.setItem(this.buildKey(portent_model_1.Portent), portentJSON);
        var charactersSerialized = [].concat.apply([], campaignsSerialized.map(function (c) { return c.cast; }));
        var characterJSON = JSON.stringify(charactersSerialized.map(function (c) { return JSON.stringify(c); }));
        localStorage.setItem(this.buildKey(character_model_1.Character), characterJSON);
        return {
            campaigns: campaignJSON,
            fronts: frontJSON,
            dangers: dangerJSON,
            portents: portentJSON,
            characters: characterJSON
        };
    };
    DataService.prototype.setValue = function (key, value) {
        var newValue = JSON.stringify(value);
        localStorage.setItem(PREFIX + '_' + key, newValue);
    };
    DataService.prototype.getValue = function (key) {
        var retrieved = localStorage.getItem(PREFIX + '_' + key);
        return retrieved
            ? JSON.parse(retrieved)
            : undefined;
    };
    DataService.prototype.export = function (campaigns) {
        var saved = this.save(campaigns);
        return JSON.stringify(saved);
    };
    DataService.prototype.import = function (json) {
        var parsed = JSON.parse(json);
        return this.load(parsed);
    };
    DataService.prototype.load = function (source) {
        var _this = this;
        var fetch = source
            ? function (c) { return source[c.key + 's']; }
            : function (c) { return localStorage.getItem(_this.buildKey(c)); };
        console.info('Loading data...');
        var fetchedCharacters = fetch(character_model_1.Character);
        var characters = fetchedCharacters
            ? JSON.parse(fetchedCharacters).map(function (c) { return character_model_1.Character.deserialize(c); })
            : [];
        var fetchedPortents = fetch(portent_model_1.Portent);
        var portents = fetchedPortents
            ? JSON.parse(fetchedPortents).map(function (p) { return portent_model_1.Portent.deserialize(p); })
            : [];
        var fetchedDangers = fetch(danger_model_1.Danger);
        var dangers = fetchedDangers
            ? JSON.parse(fetchedDangers).map(function (d) { return danger_model_1.Danger.deserialize(d, characters, portents); })
            : [];
        var fetchedFronts = fetch(front_model_1.Front);
        var fronts = fetchedFronts
            ? JSON.parse(fetchedFronts).map(function (f) { return front_model_1.Front.deserialize(f, dangers, characters, portents); })
            : [];
        var fetchedCampaigns = fetch(campaign_model_1.Campaign);
        var campaigns = fetchedCampaigns
            ? JSON.parse(fetchedCampaigns).map(function (c) { return campaign_model_1.Campaign.deserialize(c, fronts, dangers, characters, portents); })
            : [];
        console.info('...loaded ' + campaigns.length + ' campaigns');
        return campaigns;
    };
    DataService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], DataService);
    return DataService;
}());
exports.DataService = DataService;
function debugService() {
    var char1 = new character_model_1.Character().set({
        name: 'a name',
        hint: 'a hint',
        description: 'a descr',
        notes: 'a notes'
    });
    var char2 = new character_model_1.Character().set({
        name: 'b name',
        hint: 'b hint',
        description: 'b descr',
        notes: 'b notes'
    });
    var char3 = new character_model_1.Character().set({
        name: 'c name',
        hint: 'c hint',
        description: 'c descr',
        notes: 'c notes'
    });
    var char4 = new character_model_1.Character().set({
        name: 'd name',
        hint: 'd hint',
        description: 'd descr',
        notes: 'd notes'
    });
    var port1 = new portent_model_1.Portent().set({
        label: 'a label',
        passed: false
    });
    var port2 = new portent_model_1.Portent().set({
        label: 'b label',
        passed: false
    });
    var port3 = new portent_model_1.Portent().set({
        label: 'c label',
        passed: false
    });
    var port4 = new portent_model_1.Portent().set({
        label: 'd label',
        passed: false
    });
    var port5 = new portent_model_1.Portent().set({
        label: 'e label',
        passed: false
    });
    var dan1 = new danger_model_1.Danger().set({
        name: 'a danger name',
        description: 'a danger description',
        type: 'a danger type',
        impulse: 'a danger impulse',
        cast: [char1],
        portents: [port1, port2],
        impendingDoom: 'a danger doom'
    });
    var dan2 = new danger_model_1.Danger().set({
        name: 'b danger name',
        description: 'b danger description',
        type: 'b danger type',
        impulse: 'b danger impulse',
        cast: [char2, char3],
        portents: [port3],
        impendingDoom: 'b danger doom'
    });
    var dan3 = new danger_model_1.Danger().set({
        name: 'c danger name',
        description: 'c danger description',
        type: 'c danger type',
        impulse: 'c danger impulse',
        cast: [char4],
        portents: [port4, port5],
        impendingDoom: 'c danger doom'
    });
    var front1 = new front_model_1.Front().set({
        name: 'a front name',
        type: 'a front type',
        description: 'a front description',
        dangers: [dan1, dan2]
    });
    var front2 = new front_model_1.Front().set({
        name: 'b front name',
        type: 'b front type',
        description: 'b front description',
        dangers: [dan3]
    });
    var campaign = new campaign_model_1.Campaign().set({
        name: 'name',
        description: 'descr',
        fronts: [front1, front2],
        dangers: [dan1, dan2, dan3],
        characters: [char1, char2, char3, char4]
    });
    var exported = this.export([campaign]);
    console.log(exported);
    console.log(this.import(exported));
}
//# sourceMappingURL=data.service.js.map