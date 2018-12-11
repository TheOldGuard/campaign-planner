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
    name: 'New Front',
    type: 'adventure',
    description: '...description',
    dangers: []
};
var Front = /** @class */ (function () {
    function Front(id) {
        this.name = DEFAULTS.name;
        this.type = DEFAULTS.type;
        this.description = DEFAULTS.description;
        this.dangers = [];
        this.archived = false;
        this.uuid = id || uuid_service_1.UuidService.fast();
    }
    Front_1 = Front;
    Front.prototype.set = function (data) {
        this.name = data.name;
        this.type = data.type;
        this.description = data.description;
        this.dangers = data.dangers;
        this.archived = data.archived;
        return this;
    };
    Front.prototype.serialize = function () {
        var serializedDangers = this.dangers.map(function (d) { return d.serialize(); });
        var dangers = serializedDangers.map(function (d) { return d.data; });
        var castArr = [].concat.apply([], serializedDangers.map(function (d) { return d.cast; }));
        var cast = util_1.dedupe(castArr);
        var portents = util_1.dedupe([].concat.apply([], serializedDangers.map(function (d) { return d.portents; })));
        var data = {
            uuid: this.uuid,
            name: this.name,
            type: this.type,
            description: this.description,
            dangers: this.dangers.map(function (c) { return c.uuid; }),
            archived: this.archived
        };
        return {
            data: data,
            dangers: dangers,
            cast: cast,
            portents: portents
        };
    };
    Front.deserialize = function (ser, allDangers, characters, allPortents) {
        var data = JSON.parse(ser);
        var front = new Front_1(data.uuid);
        var dangers = allDangers.filter(function (d) { return data.dangers.indexOf(d.uuid) > -1; });
        var deserialized = __assign({}, data, { dangers: dangers });
        front.set(deserialized);
        return front;
    };
    Front.defaults = function () {
        var def = __assign({}, DEFAULTS);
        def.dangers = [];
        return def;
    };
    Front.prototype.addDanger = function (danger) {
        this.dangers.push(danger);
    };
    Front.prototype.removeDanger = function (danger) {
        var before = this.dangers.length;
        this.dangers = this.dangers.filter(function (c) { return c.uuid !== danger.uuid; });
        return this.dangers.length !== before;
    };
    Front.key = 'front';
    Front = Front_1 = __decorate([
        staticImplements_decorator_1.staticImplements(),
        __metadata("design:paramtypes", [String])
    ], Front);
    return Front;
    var Front_1;
}());
exports.Front = Front;
//# sourceMappingURL=front.model.js.map