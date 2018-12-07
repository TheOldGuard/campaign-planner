import { UuidService as uuid } from '../uuid.service';

import { staticImplements } from '../decorators/staticImplements.decorator';

import { ICharacter, ICharacterStatic, ICharacterData } from './interfaces.model';

interface ICharacterSerialized extends ICharacter{};

@staticImplements<ICharacterStatic>()
export class Character implements ICharacter {

    static key = 'character';

    public uuid: string;
    public name: string = 'New Character';
    public hint: string = '...hint';
    public description: string = '...description';
    public notes: string = '...notes';
    public archived = false;

    constructor(id?:string) {
        this.uuid = id || uuid.fast();
    }

    set(data: ICharacterData){
        this.name = data.name;
        this.hint = data.hint;
        this.description = data.description;
        this.notes = data.notes;
        this.archived = data.archived;

        return this;
    }

    serialize(): string {
        return JSON.stringify(this);
    }

    static deserialize(ser: string): Character {
        let data: ICharacterSerialized = JSON.parse(ser);
        let char = new Character(data.uuid);
        char.set(data);
        return char;
    }
}