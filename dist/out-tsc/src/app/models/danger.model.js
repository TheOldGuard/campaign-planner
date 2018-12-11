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
var DEFAULTS = {
    name: 'New Danger',
    type: 'Ambitious Organization',
    impulse: '...impulse',
    description: '...description',
    impendingDoom: '...impending doom',
    cast: [],
    portents: []
};
var Danger = /** @class */ (function () {
    function Danger(id) {
        this.name = DEFAULTS.name;
        this.type = DEFAULTS.type;
        this.impulse = DEFAULTS.impulse;
        this.description = DEFAULTS.description;
        this.cast = [];
        this.portents = [];
        this.impendingDoom = DEFAULTS.impendingDoom;
        this.archived = false;
        this.uuid = id || uuid_service_1.UuidService.fast();
    }
    Danger_1 = Danger;
    Danger.prototype.set = function (data) {
        this.name = data.name;
        this.type = data.type;
        this.impulse = data.impulse;
        this.description = data.description;
        this.cast = data.cast;
        this.portents = data.portents;
        this.impendingDoom = data.impendingDoom;
        this.archived = data.archived;
        return this;
    };
    Danger.prototype.serialize = function () {
        var cast = this.cast;
        var portents = this.portents;
        var data = {
            uuid: this.uuid,
            name: this.name,
            type: this.type,
            impulse: this.impulse,
            description: this.description,
            impendingDoom: this.impendingDoom,
            cast: this.cast.map(function (c) { return c.uuid; }),
            portents: this.portents.map(function (p) { return p.uuid; }),
            archived: this.archived
        };
        return { data: data, cast: cast, portents: portents };
    };
    Danger.defaults = function () {
        var def = __assign({}, DEFAULTS);
        def.cast = [];
        def.portents = [];
        return def;
    };
    Danger.deserialize = function (ser, characters, allPortents) {
        var data = JSON.parse(ser);
        var danger = new Danger_1(data.uuid);
        var cast = characters.filter(function (c) { return data.cast.indexOf(c.uuid) > -1; });
        var portents = allPortents.filter(function (p) { return data.portents.indexOf(p.uuid) > -1; });
        var deserialized = __assign({}, data, { cast: cast, portents: portents });
        danger.set(deserialized);
        return danger;
    };
    Danger.prototype.addCharacter = function (char) {
        this.cast.push(char);
    };
    Danger.prototype.removeCharacter = function (char) {
        var before = this.cast.length;
        this.cast = this.cast.filter(function (c) { return c.uuid !== char.uuid; });
        return this.cast.length !== before;
    };
    Danger.key = 'danger';
    Danger = Danger_1 = __decorate([
        staticImplements_decorator_1.staticImplements(),
        __metadata("design:paramtypes", [String])
    ], Danger);
    return Danger;
    var Danger_1;
}());
exports.Danger = Danger;
//# sourceMappingURL=danger.model.js.map