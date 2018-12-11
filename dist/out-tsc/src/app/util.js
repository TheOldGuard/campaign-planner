"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* https://stackoverflow.com/a/14426274 */
function instanceOfX(obj, key) {
    return key in obj;
}
exports.instanceOfX = instanceOfX;
function dedupeAny(coll, key) {
    var unique = {};
    var remove = [];
    for (var i = 0; i < coll.length; i += 1) {
        var item = coll[i];
        if (unique[item[key]]) {
            remove.push(i);
        }
        else {
            unique[item[key]] = true;
        }
    }
    return coll.filter(function (item, i) { return remove.indexOf(i) < 0; });
}
exports.dedupeAny = dedupeAny;
function dedupe(coll) {
    return dedupeAny(coll, 'uuid');
}
exports.dedupe = dedupe;
//# sourceMappingURL=util.js.map