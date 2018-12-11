import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface EntityDataChangeEvent {
  entity: string,
  action: 'add'|'remove',
  data: any
}

@Injectable({
  providedIn: 'root'
})
export class EntityDataChangeService {

  private subject: Subject<EntityDataChangeEvent> = new Subject();

  constructor() { }

  observable() {
    return this.subject.asObservable();
  }

  sendMessage(msg: EntityDataChangeEvent) {
    this.subject.next(msg);
  }

  
}
