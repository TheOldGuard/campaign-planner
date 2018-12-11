import { UuidService as uuid } from '../uuid.service';

import { staticImplements } from '../decorators/staticImplements.decorator';

import { IPortent, IPortentData, IPortentStatic } from './interfaces.model';

export interface IPortentSerialized extends IPortent { }

const DEFAULTS: IPortentData = {
    label: 'New portent',
    passed: false,
    archived: false
};

@staticImplements<IPortentStatic>()
export class Portent implements IPortent {
    static key = 'portent';

    public uuid: string;
    public label: string = DEFAULTS.label;
    public passed: boolean = DEFAULTS.passed;
    public archived: boolean = DEFAULTS.archived;

    constructor(id?:string) {
        this.uuid = id || uuid.fast();
    }

    set(data: IPortentData) {
        this.label = data.label;
        this.passed = data.passed;
        this.archived = data.archived;

        return this;
    }

    serialize(): string {
        return JSON.stringify({
            uuid: this.uuid,
            label: this.label,
            passed: this.passed,
            archived: this.archived
        });
    }

    static deserialize(ser: string): Portent {
        let data: IPortentSerialized = JSON.parse(ser);
        let portent = new Portent(data.uuid);
        portent.set(data);
        return portent;
    }

    static defaults() {
        return DEFAULTS;
    }
}