import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'input-mask',
  templateUrl: './input-mask.component.html',
  styleUrls: ['./input-mask.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputMaskComponent),
      multi: true,
    },
  ],
})
export class InputMaskComponent implements ControlValueAccessor, OnInit {
  @Input() required = false;
  @Input() readonly = false;
  @Input() disabled = false;
  @Input() colspan = '4';
  @Input() label!: string;
  @Input() control!: FormControl;
  @Input() type = 'text';
  @Input() maskInput!:
    | boolean
    | (string | RegExp)[]
    | ((raw: string) => (string | RegExp)[]);

  constructor() {}

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  value: any;

  ngOnInit() {
    if (this.control) {
        this.control.valueChanges.subscribe((value) => {
            this.onChange(value);
            this.onTouched();
        });
    }
}

  writeValue(value: any) {
    this.value = value;
  }

  registerOnChange(onChange: (value: any) => void) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: () => void) {
    this.onTouched = onTouched;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
