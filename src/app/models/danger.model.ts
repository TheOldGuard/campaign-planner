import { UuidService as uuid } from '../uuid.service';

import { staticImplements } from '../decorators/staticImplements.decorator';

import { IStake, IDanger, IDangerData, IDangerSerialized, ICharacter, IPortent, IDangerStatic } from './interfaces.model';

const DEFAULTS: IDangerData = {
    name: 'New Danger',
    type: 'Ambitious Organization',
    impulse: '...impulse',
    description: '...description',
    impendingDoom: '...impending doom',
    cast: [],
    portents: [],
    stakes: []
};

@staticImplements<IDangerStatic>()
export class Danger implements IDanger{

    static key = 'danger';

    public uuid: string;
    public name: string = DEFAULTS.name;
    public type: string = DEFAULTS.type;
    public impulse: string = DEFAULTS.impulse;
    public description: string = DEFAULTS.description;
    public cast: ICharacter[] = [];
    public portents: IPortent[] = [];
    public stakes: IStake[] = [];
    public impendingDoom: string = DEFAULTS.impendingDoom;
    public archived = false;

    constructor(id?:string) {
        this.uuid = id || uuid.fast();
    }

    set(data: IDangerData){
        this.name = data.name;
        this.type = data.type;
        this.impulse = data.impulse;
        this.description = data.description;
        this.cast = data.cast;
        this.portents = data.portents;
        this.stakes = data.stakes;
        this.impendingDoom = data.impendingDoom;
        this.archived = data.archived;

        return this;
    }

    static serialize(danger: IDanger) {
        let d = new Danger(danger.uuid).set({...<IDangerData>danger});
        return d.serialize();
    }

    serialize(): {data: IDangerSerialized, cast: ICharacter[], portents: IPortent[], stakes: IStake[]} {
        let data = {
            uuid: this.uuid,
            name: this.name,
            type: this.type,
            impulse: this.impulse,
            description: this.description,
            impendingDoom: this.impendingDoom,
            cast: this.cast.map(c => c.uuid),
            stakes: this.stakes.map(s => s.uuid),
            portents: this.portents.map(p => p.uuid),
            archived: this.archived
        };
        return {data: data, cast: this.cast, portents: this.portents, stakes: this.stakes};
    }

    static defaults(): IDangerData {
        let def = {...DEFAULTS};
        def.cast = [];
        def.portents = [];
        return def;
    }

    static deserialize(ser: string, characters: ICharacter[], allPortents: IPortent[], allStakes: IStake[]): Danger {
        let data: IDangerSerialized = JSON.parse(ser);
        let cast = characters.filter(c => data.cast.indexOf(c.uuid) > -1);
        let portents = allPortents.filter(p => data.portents.indexOf(p.uuid) > -1);
        let stakes = allStakes.filter(s => data.stakes.indexOf(s.uuid) > -1);
        let deserialized: IDangerData = <IDangerData>{...data, cast: cast, portents: portents, stakes: stakes};
        return new Danger(data.uuid).set(deserialized);
    }

    addCharacter(char: ICharacter) {
        this.cast.push(char);
    }

    removeCharacter(char: ICharacter) {
        let before = this.cast.length;
        this.cast = this.cast.filter(c => c.uuid !== char.uuid);
        return this.cast.length !== before;
    }
}