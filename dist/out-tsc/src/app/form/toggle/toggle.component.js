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
var forms_1 = require("@angular/forms");
var uuid_service_1 = require("../../uuid.service");
var ToggleComponent = /** @class */ (function () {
    function ToggleComponent() {
        this._value = false;
        this.round = false;
        this.propagateChange = function (_) { };
        this.id = uuid_service_1.UuidService.fast();
    }
    ToggleComponent_1 = ToggleComponent;
    Object.defineProperty(ToggleComponent.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (val) {
            this._value = !!val;
            this.propagateChange(this._value);
        },
        enumerable: true,
        configurable: true
    });
    ToggleComponent.prototype.writeValue = function (value) {
        this.value = !!value; // coerce to boolean
    };
    ToggleComponent.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    ToggleComponent.prototype.registerOnTouched = function () { };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ToggleComponent.prototype, "_value", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ToggleComponent.prototype, "label", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ToggleComponent.prototype, "round", void 0);
    ToggleComponent = ToggleComponent_1 = __decorate([
        core_1.Component({
            selector: 'og-toggle',
            templateUrl: './toggle.component.html',
            styleUrls: ['./toggle.component.css'],
            providers: [
                {
                    provide: forms_1.NG_VALUE_ACCESSOR,
                    useExisting: core_1.forwardRef(function () { return ToggleComponent_1; }),
                    multi: true
                }
            ]
        }),
        __metadata("design:paramtypes", [])
    ], ToggleComponent);
    return ToggleComponent;
    var ToggleComponent_1;
}());
exports.ToggleComponent = ToggleComponent;
//# sourceMappingURL=toggle.component.js.map