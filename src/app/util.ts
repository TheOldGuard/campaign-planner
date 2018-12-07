/* https://stackoverflow.com/a/14426274 */
export function instanceOfX<x>(obj: any, key: string): obj is x {
    return key in obj;
}

export function dedupeAny<t>(coll: t[], key: string): t[] {
    let unique = {};
    let remove = [];
    for (let i = 0; i < coll.length; i += 1) {
        let item = coll[i];
        if (unique[item[key]]) {
            remove.push(i);
        } else {
            unique[item[key]] = true;
        }
    }
    return coll.filter((item, i) => remove.indexOf(i) < 0);
}

export function dedupe<t>(coll: t[]): t[] {
    return dedupeAny<t>(coll, 'uuid');
}