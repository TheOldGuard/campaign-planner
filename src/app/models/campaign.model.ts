import { UuidService as uuid } from '../uuid.service';

import { staticImplements } from '../decorators/staticImplements.decorator';

import { ICampaign, ICampaignData, ICampaignStatic, ICampaignSerialized, IFront, IFrontSerialized, IDanger, ICharacter, IPortent } from './interfaces.model';
import { IDangerSerialized } from './interfaces.model';
import { dedupe } from '../util';

const DEFAULTS = {
    name: 'New Campaign',
    description: '...description',
    fronts: [],
    dangers: [],
    characters: [],
    archived: false
};

@staticImplements<ICampaignStatic>()
export class Campaign implements ICampaign{

    static key = 'campaign';

    public uuid: string;
    public name: string = 'New Campaign';
    public description: string = '...description';
    public fronts: IFront[] = [];
    public dangers: IDanger[] = [];
    public characters: ICharacter[] = [];
    public archived: boolean = false;

    constructor(id?:string) {
        this.uuid = id || uuid.fast();
    }

    set(data: ICampaignData){
        this.name = data.name;
        this.description = data.description;
        this.fronts = data.fronts;
        this.dangers = data.dangers;
        this.characters = data.characters;
        this.archived = data.archived;
        return this;
    }

    serialize(): {data: string, fronts: IFrontSerialized[], dangers: IDangerSerialized[], cast: string[], portents: string[]} {
        let serializedFronts = this.fronts.map(f => f.serialize());
        let fronts = serializedFronts.map(f => f.data);
        let serializedDangers: IDangerSerialized[] = [].concat(...serializedFronts.map(f => f.dangers));
        let dangers = dedupe(serializedDangers);
        let castArr = [].concat(...serializedFronts.map(d => d.cast));
        let cast = dedupe(castArr);
        let portents = dedupe([].concat(...serializedFronts.map(d => d.portents)));
        let data = JSON.stringify({
            uuid: this.uuid,
            name: this.name,
            description: this.description,
            characters: cast.map(c => c.uuid),
            fronts: serializedFronts.map(f => f.data.uuid),
            dangers: dangers.map(d => d.uuid),
            archived: this.archived
        });
        return {
            data: data,
            fronts: fronts,
            dangers: dangers,
            cast: cast,
            portents: portents
        };
    }

    static deserialize(ser: string, allFronts: IFront[], allDangers: IDanger[], allCharacters: ICharacter[], allPortents: IPortent[]): Campaign {
        let data: ICampaignSerialized = JSON.parse(ser);
        let campaign = new Campaign(data.uuid);
        let fronts = allFronts.filter(f => data.fronts.indexOf(f.uuid) > -1);
        let dangers = allDangers.filter(d => data.dangers.indexOf(d.uuid) > -1);
        let characters = allCharacters.filter(c => data.characters.indexOf(c.uuid) > -1);
        let deserialized: ICampaignData = <ICampaignData>{...data, fronts: fronts, dangers: dangers, characters: characters};
        campaign.set(deserialized);
        return campaign;
    }

    static defaults() {

        return DEFAULTS;
    }

    addDanger(danger: IDanger) {
        this.dangers.push(danger);
    }

    removeDanger(danger: IDanger) {
        let before = this.dangers.length;
        this.dangers = this.dangers.filter(c => c.uuid !== danger.uuid);
        return this.dangers.length !== before;
    }
}