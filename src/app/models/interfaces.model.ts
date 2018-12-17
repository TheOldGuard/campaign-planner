

export interface IUniquelyIdentified {
    uuid: string;
}

export interface IArchivable {
    archived?: boolean;
}

export interface ISettable<d,c> {
    set(data: d): c;
}

export interface ISerializeable {
    serialize(): string;
}

export interface IDeserializeable<t> {
    new(): t;
    deserialize(ser: string): t;
}

// static
export interface IStorable {
    key: string;
}

// ---------- STAKES ----------
export interface IStakeData extends IArchivable {
    question: string;
}

export interface IStakeStatic extends IDeserializeable<IStake>, IStorable{}

export interface IStake extends IStakeData, IUniquelyIdentified, ISerializeable, ISettable<IStakeData,IStake> {}


// ---------- PORTENTS ----------
export interface IPortentData extends IArchivable {
    label: string;
    passed: boolean;
}

export interface IPortentStatic extends IDeserializeable<IPortent>, IStorable{}

export interface IPortent extends IPortentData, IUniquelyIdentified, ISerializeable, ISettable<IPortentData,IPortent> {
}


// ---------- CHARACTERS ----------
export interface ICharacterStatic extends IDeserializeable<ICharacter>, IStorable{}

export interface ICharacterData extends IArchivable {
    name: string;
    hint: string;
    description: string;
    notes: string;
}

export interface ICharacter extends ICharacterData, IUniquelyIdentified, ISerializeable, ISettable<ICharacterData, ICharacter> { }


// ---------- DANGERS ----------
export interface IDangerData extends IArchivable {
    name: string;
    type: string;
    impulse: string;
    description: string;
    cast: ICharacter[];
    portents: IPortent[];
    stakes: IStake[];
    impendingDoom: string;
}

export interface IDangerStatic extends IStorable {
    new(): IDanger;
    serialize(danger: IDanger): {data: IDangerSerialized, cast: ICharacter[], portents: IPortent[], stakes: IStake[]}
    deserialize(data: string, cast: ICharacter[], portents: IPortent[], stakes: IStake[]): IDanger;
}

export interface IDangerSerialized {
    uuid: string;
    name: string;
    type: string;
    impulse: string;
    description: string;
    cast: string[];
    portents: string[];
    stakes: string[];
    impendingDoom: string;
    archived: boolean;
}

export interface IDanger extends IDangerData, IUniquelyIdentified, ISettable<IDangerData, IDanger> {
    removeCharacter(character: ICharacter): void;
    serialize(): {data: IDangerSerialized, cast: ICharacter[], portents: IPortent[], stakes: IStake[]}
}


// ---------- FRONTS ----------
export interface IFrontData extends IArchivable {
    name: string;
    type: string;
    description: string;
    dangers: IDanger[];
}

export interface IFrontStatic extends IStorable {
    new(): IFront;
    serialize(front: IFront): {data: IFrontSerialized, dangers: IDangerSerialized[], cast: ICharacter[], portents: IPortent[]};
    deserialize(data: string, dangers: IDanger[], cast: ICharacter[], portents: IPortent[]): IFront;
    defaults(): IFrontData;
}

export interface IFront extends IFrontData, IUniquelyIdentified, ISettable<IFrontData, IFront> {
    removeDanger(danger: IDanger): void;
    serialize(): {data: IFrontSerialized, dangers: IDangerSerialized[], cast: ICharacter[], portents: IPortent[], stakes: IStake[]}
}

export interface IFrontSerialized {
    uuid: string;
    name: string;
    type: string;
    description: string;
    dangers: string[];
    archived: boolean;

}


// ---------- CAMPAIGNS ----------
export interface ICampaignData extends IArchivable {
    name: string;
    description: string;
    fronts: IFront[];
    dangers: IDanger[];
    characters: ICharacter[];
}

export interface ICampaignStatic extends IStorable {
    new(): ICampaign
    serialize(campaign: ICampaign): {data: string, fronts: IFrontSerialized[], dangers: IDangerSerialized[], cast: string[], portents: string[], stakes: string[]}
    deserialize(data: string, fronts: IFront[], dangers: IDanger[], cast: ICharacter[], portents: IPortent[], stakes: IStake[]): ICampaign;
    defaults(): ICampaignData
}

export interface ICampaign extends ICampaignData, IUniquelyIdentified, ISettable<ICampaignData, ICampaign> {
    removeDanger(danger: IDanger): void;
    removeCharacter(character: ICharacter): void;
    serialize(): {data: string, fronts: IFrontSerialized[], dangers: IDangerSerialized[], cast: string[], portents: string[], stakes: string[]}
}

export interface ICampaignSerialized {
    uuid: string,
    name: string,
    description: string,
    characters: string[],
    fronts: string[],
    dangers: string[],
    archived: boolean
}