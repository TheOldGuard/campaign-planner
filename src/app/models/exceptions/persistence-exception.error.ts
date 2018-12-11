import { Exception } from "./exception.error";

export class PersistenceException extends Exception {
    public title: string;

    constructor(title: string, message: string) {
        super(message);
        this.name = 'PersistenceException';
        this.message = message;
        this.title = title;
    }
}