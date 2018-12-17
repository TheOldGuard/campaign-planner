import { staticImplements } from '../decorators/staticImplements.decorator';

import { UuidService as uuid } from '../uuid.service';
import { IStakeData, IStake, IStakeStatic } from './interfaces.model';

const DEFAULTS: IStakeData = {
    question: '...question'
}

@staticImplements<IStakeStatic>()
export class Stake implements IStake {
    static key = 'stake';

    public uuid;
    public question: string = DEFAULTS.question;

    constructor(uuidIn?: string) {
        this.uuid = uuidIn? uuidIn : uuid.fast();
    }

    set(data: IStakeData): IStake {
        this.question = data.question;
        return this;
    }

    serialize() {
        return JSON.stringify({
            uuid: this.uuid,
            question: this.question
        });
    }

    static deserialize(data: string): IStake {
        let parsed = JSON.parse(data);
        let stake = new Stake(parsed.uuid).set(parsed);
        return stake;
    }

    static defaults() {
        return DEFAULTS;
    }
}