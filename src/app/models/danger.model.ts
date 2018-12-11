import { UuidService as uuid } from '../uuid.service';

import { staticImplements } from '../decorators/staticImplements.decorator';

import { IDanger, IDangerData, IDangerSerialized, ICharacter, IPortent, IDangerStatic } from './interfaces.model';

const DEFAULTS: IDangerData = {
    name: 'New Danger',
    type: 'Ambitious Organization',
    impulse: '...impulse',
    description: '...description',
    impendingDoom: '...impending doom',
    cast: [],
    portents: []
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
        this.impendingDoom = data.impendingDoom;
        this.archived = data.archived;

        return this;
    }

    serialize(): {data: IDangerSerialized, cast: ICharacter[], portents: IPortent[]} {
        let cast = this.cast;
        let portents = this.portents;
        let data = {
            uuid: this.uuid,
            name: this.name,
            type: this.type,
            impulse: this.impulse,
            description: this.description,
            impendingDoom: this.impendingDoom,
            cast: this.cast.map(c => c.uuid),
            portents: this.portents.map(p => p.uuid),
            archived: this.archived
        };
        return {data: data, cast: cast, portents: portents};
    }

    static defaults(): IDangerData {
        let def = {...DEFAULTS};
        def.cast = [];
        def.portents = [];
        return def;
    }

    static deserialize(ser: string, characters: ICharacter[], allPortents: IPortent[]): Danger {
        let data: IDangerSerialized = JSON.parse(ser);
        let danger = new Danger(data.uuid);
        let cast = characters.filter(c => data.cast.indexOf(c.uuid) > -1);
        let portents = allPortents.filter(p => data.portents.indexOf(p.uuid) > -1);
        let deserialized: IDangerData = <IDangerData>{...data, cast: cast, portents: portents};
        danger.set(deserialized);
        return danger;
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