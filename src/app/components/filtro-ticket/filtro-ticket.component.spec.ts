import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroTicketComponent } from './filtro-ticket.component';

describe('FiltroTicketComponent', () => {
  let component: FiltroTicketComponent;
  let fixture: ComponentFixture<FiltroTicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroTicketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
