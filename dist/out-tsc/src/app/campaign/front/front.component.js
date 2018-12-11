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
var front_model_1 = require("src/app/models/front.model");
var FrontComponent = /** @class */ (function () {
    function FrontComponent() {
        this.isEditing = false;
        this.isOpen = false;
    }
    FrontComponent.prototype.onFieldFocus = function (field) {
        if (this.isDefault(field)) {
            this.front[field] = '';
        }
    };
    FrontComponent.prototype.onFieldBlur = function (field) {
        if (!this.front[field]) {
            this.front[field] = front_model_1.Front.defaults()[field];
        }
    };
    FrontComponent.prototype.isDefault = function (field) {
        return front_model_1.Front.defaults()[field] === this.front[field];
    };
    FrontComponent.prototype.toggleEditing = function () {
        this.isEditing = !this.isEditing;
    };
    FrontComponent.prototype.toggleOpen = function () {
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
    FrontComponent.prototype.ngOnDestroy = function () {
        if (this.heightFixer !== undefined) {
            window.clearInterval(this.heightFixer);
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FrontComponent.prototype, "front", void 0);
    __decorate([
        core_1.ViewChild('panel'),
        __metadata("design:type", core_1.ElementRef)
    ], FrontComponent.prototype, "panel", void 0);
    FrontComponent = __decorate([
        core_1.Component({
            selector: 'og-front',
            templateUrl: './front.component.html',
            styleUrls: ['./front.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], FrontComponent);
    return FrontComponent;
}());
exports.FrontComponent = FrontComponent;
//# sourceMappingURL=front.component.js.map