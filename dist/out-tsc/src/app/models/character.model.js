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
var uuid_service_1 = require("../uuid.service");
var staticImplements_decorator_1 = require("../decorators/staticImplements.decorator");
;
var Character = /** @class */ (function () {
    function Character(id) {
        this.name = 'New Character';
        this.hint = '...hint';
        this.description = '...description';
        this.notes = '...notes';
        this.archived = false;
        this.uuid = id || uuid_service_1.UuidService.fast();
    }
    Character_1 = Character;
    Character.prototype.set = function (data) {
        this.name = data.name;
        this.hint = data.hint;
        this.description = data.description;
        this.notes = data.notes;
        this.archived = data.archived;
        return this;
    };
    Character.prototype.serialize = function () {
        return JSON.stringify(this);
    };
    Character.deserialize = function (ser) {
        var data = JSON.parse(ser);
        var char = new Character_1(data.uuid);
        char.set(data);
        return char;
    };
    Character.key = 'character';
    Character = Character_1 = __decorate([
        staticImplements_decorator_1.staticImplements(),
        __metadata("design:paramtypes", [String])
    ], Character);
    return Character;
    var Character_1;
}());
exports.Character = Character;
//# sourceMappingURL=character.model.js.map