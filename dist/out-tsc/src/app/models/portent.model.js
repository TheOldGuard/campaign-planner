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
var Portent = /** @class */ (function () {
    function Portent(id) {
        this.label = '';
        this.passed = false;
        this.archived = false;
        this.uuid = id || uuid_service_1.UuidService.fast();
    }
    Portent_1 = Portent;
    Portent.prototype.set = function (data) {
        this.label = data.label;
        this.passed = data.passed;
        this.archived = data.archived;
        return this;
    };
    Portent.prototype.serialize = function () {
        return JSON.stringify({
            uuid: this.uuid,
            label: this.label,
            passed: this.passed,
            archived: this.archived
        });
    };
    Portent.deserialize = function (ser) {
        var data = JSON.parse(ser);
        var portent = new Portent_1(data.uuid);
        portent.set(data);
        return portent;
    };
    Portent.key = 'portent';
    Portent = Portent_1 = __decorate([
        staticImplements_decorator_1.staticImplements(),
        __metadata("design:paramtypes", [String])
    ], Portent);
    return Portent;
    var Portent_1;
}());
exports.Portent = Portent;
//# sourceMappingURL=portent.model.js.map