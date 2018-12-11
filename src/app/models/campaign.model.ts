import { UuidService as uuid } from '../uuid.service';

import { staticImplements } from '../decorators/staticImplements.decorator';

import { ICampaign, ICampaignData, ICampaignStatic, ICampaignSerialized, IFront, IFrontSerialized, IDanger, ICharacter, IPortent } from './interfaces.model';
import { IDangerSerialized } from './interfaces.model';
import { dedupe } from '../util';
import { Front } from './front.model';

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

    static serialize(campaign: ICampaign) {
        let camp = new Campaign(campaign.uuid).set({...<ICampaignData>campaign});
        return camp.serialize();
    }

    serialize(): {data: string, fronts: IFrontSerialized[], dangers: IDangerSerialized[], cast: string[], portents: string[]} {
        let serializedFronts = this.fronts.map(f => Front.serialize(f));
        let fronts = serializedFronts.map(f => f.data);
        let serializedDangers: IDangerSerialized[] = [].concat(...serializedFronts.map(f => f.dangers),this.dangers.map(d => d.serialize().data));
        let dangers = dedupe(serializedDangers);
        let castArr = [].concat(...serializedFronts.map(d => d.cast), ...this.characters);
        let cast = dedupe(castArr);
        let allDangerPortents = this.dangers.map(d => d.serialize().portents);
        let frontDangerPortents = serializedFronts.map(d => d.portents);
        let portents = dedupe([].concat(...frontDangerPortents, ...allDangerPortents));
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
        this.fronts.forEach(f => f.removeDanger(danger));
    }

    removeCharacter(character: ICharacter) {
        let before = this.characters.length;
        this.characters = this.characters.filter(c => c.uuid !== character.uuid);
        this.dangers.forEach(d => d.removeCharacter(character));
    }
}