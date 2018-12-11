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
var danger_model_1 = require("../../models/danger.model");
var DangerComponent = /** @class */ (function () {
    function DangerComponent() {
        this.isEditing = false;
        this.isOpen = false;
    }
    DangerComponent.prototype.onFieldFocus = function (field) {
        if (this.isDefault(field)) {
            this.danger[field] = '';
        }
    };
    DangerComponent.prototype.onFieldBlur = function (field) {
        if (!this.danger[field]) {
            this.danger[field] = danger_model_1.Danger.defaults()[field];
        }
    };
    DangerComponent.prototype.isDefault = function (field) {
        return danger_model_1.Danger.defaults()[field] === this.danger[field];
    };
    DangerComponent.prototype.toggleEditing = function () {
        this.isEditing = !this.isEditing;
    };
    DangerComponent.prototype.toggleOpen = function () {
        this.isOpen = !this.isOpen;
        this.isEditing = false;
        var panel = this.panel.nativeElement;
        if (this.isOpen) {
            var newHeight = panel.scrollHeight + 'px';
            panel.style.maxHeight = panel.scrollHeight + 'px';
            this.heightFixer = window.setInterval(function () {
                panel.style.maxHeight = panel.scrollHeight + 'px';
            }, 100);
        }
        else {
            window.clearInterval(this.heightFixer);
            panel.style.maxHeight = '0';
        }
        // this.isCollapsing = true;
        // this.collapseTimeout = window.setTimeout(() => {
        //   this.isCollapsing = false;
        //   this.collapseTimeout = undefined;
        // });
    };
    DangerComponent.prototype.ngOnDestroy = function () {
        if (this.heightFixer !== undefined) {
            window.clearInterval(this.heightFixer);
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DangerComponent.prototype, "danger", void 0);
    __decorate([
        core_1.ViewChild('panel'),
        __metadata("design:type", core_1.ElementRef)
    ], DangerComponent.prototype, "panel", void 0);
    DangerComponent = __decorate([
        core_1.Component({
            selector: 'og-danger',
            templateUrl: './danger.component.html',
            styleUrls: ['./danger.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], DangerComponent);
    return DangerComponent;
}());
exports.DangerComponent = DangerComponent;
//# sourceMappingURL=danger.component.js.map