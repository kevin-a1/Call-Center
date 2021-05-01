import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasosAbiertosComponent } from './casos-abiertos.component';

describe('CasosAbiertosComponent', () => {
  let component: CasosAbiertosComponent;
  let fixture: ComponentFixture<CasosAbiertosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasosAbiertosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasosAbiertosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
