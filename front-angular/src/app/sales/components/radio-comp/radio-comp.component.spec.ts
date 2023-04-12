/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RadioCompComponent } from './radio-comp.component';

describe('RadioCompComponent', () => {
  let component: RadioCompComponent;
  let fixture: ComponentFixture<RadioCompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadioCompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
