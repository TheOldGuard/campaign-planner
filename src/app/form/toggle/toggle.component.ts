import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { UuidService as uuid } from '../../uuid.service';

@Component({
  selector: 'og-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToggleComponent),
      multi: true
    }
  ]
})
export class ToggleComponent implements ControlValueAccessor {

  @Input()
  _value: boolean = false;

  @Input()
  label: string;

  @Input() locked: boolean = false;

  id: string;

  @Input() round: boolean = false;

  get value() {
    return this._value;
  }

  set value(val: boolean) {
    console.log('new value!',val);
    if (!this.locked) {
      this._value = !!val;
      this.propagateChange(this._value);
    }
  }

  constructor() {
    this.id = uuid.fast();
  }

  propagateChange = (_: any) => {}

  writeValue(value: boolean) {
    if (!this.locked) {
      this.value = !!value; // coerce to boolean
    }
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}
}
