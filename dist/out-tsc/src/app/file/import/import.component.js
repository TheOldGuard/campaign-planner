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
var data_service_1 = require("src/app/data.service");
var ImportComponent = /** @class */ (function () {
    function ImportComponent(dataService) {
        this.dataService = dataService;
        this.importEmitter = new core_1.EventEmitter();
        this.errorEmitter = new core_1.EventEmitter();
    }
    ImportComponent.prototype.addFile = function () {
        this.file.nativeElement.click();
    };
    ImportComponent.prototype.onFilesAdded = function () {
        var _this = this;
        var file = this.file.nativeElement.files[0];
        if (file) {
            var reader = new FileReader();
            reader.readAsText(file, "UTF-8");
            reader.onload = function (evt) {
                var res = evt;
                var campaigns;
                try {
                    campaigns = _this.dataService.import(res.target.result);
                    if (campaigns) {
                        _this.importEmitter.emit(campaigns);
                    }
                }
                catch (err) {
                    _this.errorEmitter.emit('Unable to parse file.');
                }
            };
            reader.onerror = function (evt) {
                _this.errorEmitter.emit('Erorr loading file');
            };
        }
    };
    __decorate([
        core_1.ViewChild('file'),
        __metadata("design:type", Object)
    ], ImportComponent.prototype, "file", void 0);
    __decorate([
        core_1.Output('import'),
        __metadata("design:type", core_1.EventEmitter)
    ], ImportComponent.prototype, "importEmitter", void 0);
    __decorate([
        core_1.Output('error'),
        __metadata("design:type", core_1.EventEmitter)
    ], ImportComponent.prototype, "errorEmitter", void 0);
    ImportComponent = __decorate([
        core_1.Component({
            selector: 'og-import',
            templateUrl: './import.component.html',
            styleUrls: ['./import.component.css']
        }),
        __metadata("design:paramtypes", [data_service_1.DataService])
    ], ImportComponent);
    return ImportComponent;
}());
exports.ImportComponent = ImportComponent;
//# sourceMappingURL=import.component.js.map