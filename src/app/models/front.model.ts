import { UuidService as uuid } from '../uuid.service';

import { staticImplements } from '../decorators/staticImplements.decorator';

import { IFront, IFrontData, IFrontSerialized, IFrontStatic, IDanger, ICharacter, IPortent } from './interfaces.model';
import { IDangerSerialized } from './interfaces.model';
import { dedupe } from '../util';

const DEFAULTS: IFrontData = {
    name: 'New Front',
    type: 'adventure',
    description: '...description',
    dangers: []
};

@staticImplements<IFrontStatic>()
export class Front implements IFront{

    static key = 'front';

    public uuid: string;
    public name: string = DEFAULTS.name;
    public type: string = DEFAULTS.type;
    public description: string = DEFAULTS.description;
    public dangers: IDanger[] = [];
    public archived = false;

    constructor(id?:string) {
        this.uuid = id || uuid.fast();
    }

    set(data: IFrontData){
        this.name = data.name;
        this.type = data.type;
        this.description = data.description;
        this.dangers = data.dangers;
        this.archived = data.archived;

        return this;
    }

    serialize(): {data: IFrontSerialized, dangers: IDangerSerialized[], cast: ICharacter[], portents: IPortent[]} {
        let serializedDangers = this.dangers.map(d => {
            let serialized = d.serialize();
            console.log('serialized dangers:',serialized);
            return serialized;
        });
        let dangers: IDangerSerialized[] = serializedDangers.map(d => d.data);
        let castArr = [].concat(...serializedDangers.map(d => d.cast));
        let cast = dedupe(castArr);
        let portents = dedupe([].concat(...serializedDangers.map(d => d.portents)));
        let data = {
            uuid: this.uuid,
            name: this.name,
            type: this.type,
            description: this.description,
            dangers: this.dangers.map(c => c.uuid),
            archived: this.archived
        };
        return {
            data: data,
            dangers: dangers,
            cast: cast,
            portents: portents
        };
    }

    static deserialize(ser: string, allDangers: IDanger[], characters: ICharacter[], allPortents: IPortent[]): Front {
        let data: IFrontSerialized = JSON.parse(ser);
        let front = new Front(data.uuid);
        let dangers = allDangers.filter(d => data.dangers.indexOf(d.uuid) > -1);
        let deserialized: IFrontData = <IFrontData>{...data, dangers: dangers};
        front.set(deserialized);
        return front;
    }

    static defaults(): IFrontData {
        let def = {...DEFAULTS};
        def.dangers = [];
        return def;
    }

    addDanger(danger: IDanger) {
        this.dangers.push(danger);
    }

    removeDanger(danger: IDanger) {
        this.dangers = this.dangers.filter(c => c.uuid !== danger.uuid);
    }
}