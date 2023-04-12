import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const INPUT_FIELD_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectCompComponent),
  multi: true,
};

interface Option {
  label: string;
  value: any;
}

@Component({
  selector: 'select-comp',
  templateUrl: './select-comp.component.html',
  styleUrls: ['./select-comp.component.css'],
  providers: [INPUT_FIELD_VALUE_ACCESSOR],
})
export class SelectCompComponent implements ControlValueAccessor {
  @Input() required = false;
  @Input()
  options!: Option[];
  @Input() id!: string;
  @Input() label!: string;
  @Input() type = 'text';
  @Input() control!: any;
  @Input() isReadOnly = false;

  private innerValue: any;

  get value() {
    return this.innerValue;
  }

  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCb(v);
    }
  }

  get errorMessage() {
    for (const propertyName in this.control.errors) {
      if (
        this.control.errors.hasOwnProperty(propertyName) &&
        this.control.touched
      ) {
        return this.getErrorMsg(
          this.label,
          propertyName,
          this.control.errors[propertyName]
        );
      }
    }

    return null;
  }

  getErrorMsg(
    fieldName: string,
    validatorName: string,
    validatorValue?: any
  ): any {
    const config: any = {
      required: `${fieldName} é obrigatório.`,
      minlength: `${fieldName} precisa ter no mínimo ${validatorValue.requiredLength} caracteres.`,
      maxlength: `${fieldName} precisa ter no máximo ${validatorValue.requiredLength} caracteres.`,
      cepInvalido: 'CEP inválido.',
      emailInvalido: 'Email já cadastrado!',
      equalsTo: 'Campos não são iguais',
      pattern: 'Campo inválido',
    };

    return config[validatorName];
  }

  onChangeCb: (_: any) => void = () => {};
  onTouchedCb: (_: any) => void = () => {};

  writeValue(v: any): void {
    this.value = v;
  }

  registerOnChange(fn: any): void {
    this.onChangeCb = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCb = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isReadOnly = isDisabled;
  }
}
