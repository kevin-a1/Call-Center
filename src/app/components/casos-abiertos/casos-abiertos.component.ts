import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/models/ticket';

@Component({
  selector: 'app-casos-abiertos',
  templateUrl: './casos-abiertos.component.html',
  styleUrls: ['./casos-abiertos.component.css']
})
export class CasosAbiertosComponent implements OnInit {

  tickets: Ticket[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  readAllTickets() {
    
  }
}
