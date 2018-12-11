"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
var uuid_service_1 = require("../uuid.service");
var staticImplements_decorator_1 = require("../decorators/staticImplements.decorator");
var util_1 = require("../util");
var DEFAULTS = {
    name: 'New Campaign',
    description: '...description',
    fronts: [],
    dangers: [],
    characters: [],
    archived: false
};
var Campaign = /** @class */ (function () {
    function Campaign(id) {
        this.name = 'New Campaign';
        this.description = '...description';
        this.fronts = [];
        this.dangers = [];
        this.characters = [];
        this.archived = false;
        this.uuid = id || uuid_service_1.UuidService.fast();
    }
    Campaign_1 = Campaign;
    Campaign.prototype.set = function (data) {
        this.name = data.name;
        this.description = data.description;
        this.fronts = data.fronts;
        this.dangers = data.dangers;
        this.characters = data.characters;
        this.archived = data.archived;
        return this;
    };
    Campaign.prototype.serialize = function () {
        var serializedFronts = this.fronts.map(function (f) { return f.serialize(); });
        var fronts = serializedFronts.map(function (f) { return f.data; });
        var serializedDangers = [].concat.apply([], serializedFronts.map(function (f) { return f.dangers; }).concat([this.dangers]));
        var dangers = util_1.dedupe(serializedDangers);
        var castArr = [].concat.apply([], serializedFronts.map(function (d) { return d.cast; }).concat([this.characters]));
        var cast = util_1.dedupe(castArr);
        var portents = util_1.dedupe([].concat.apply([], serializedFronts.map(function (d) { return d.portents; })));
        var data = JSON.stringify({
            uuid: this.uuid,
            name: this.name,
            description: this.description,
            characters: cast.map(function (c) { return c.uuid; }),
            fronts: serializedFronts.map(function (f) { return f.data.uuid; }),
            dangers: dangers.map(function (d) { return d.uuid; }),
            archived: this.archived
        });
        return {
            data: data,
            fronts: fronts,
            dangers: dangers,
            cast: cast,
            portents: portents
        };
    };
    Campaign.deserialize = function (ser, allFronts, allDangers, allCharacters, allPortents) {
        var data = JSON.parse(ser);
        var campaign = new Campaign_1(data.uuid);
        var fronts = allFronts.filter(function (f) { return data.fronts.indexOf(f.uuid) > -1; });
        var dangers = allDangers.filter(function (d) { return data.dangers.indexOf(d.uuid) > -1; });
        var characters = allCharacters.filter(function (c) { return data.characters.indexOf(c.uuid) > -1; });
        var deserialized = __assign({}, data, { fronts: fronts, dangers: dangers, characters: characters });
        campaign.set(deserialized);
        return campaign;
    };
    Campaign.defaults = function () {
        return DEFAULTS;
    };
    Campaign.prototype.addDanger = function (danger) {
        this.dangers.push(danger);
    };
    Campaign.prototype.removeDanger = function (danger) {
        var before = this.dangers.length;
        this.dangers = this.dangers.filter(function (c) { return c.uuid !== danger.uuid; });
        return this.dangers.length !== before;
    };
    Campaign.key = 'campaign';
    Campaign = Campaign_1 = __decorate([
        staticImplements_decorator_1.staticImplements(),
        __metadata("design:paramtypes", [String])
    ], Campaign);
    return Campaign;
    var Campaign_1;
}());
exports.Campaign = Campaign;
//# sourceMappingURL=campaign.model.js.map