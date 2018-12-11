"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var uuid_service_1 = require("./uuid.service");
describe('UuidService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [uuid_service_1.UuidService]
        });
    });
    it('should be created', testing_1.inject([uuid_service_1.UuidService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=uuid.service.spec.js.map