import { Component, NgModule, OnInit } from '@angular/core';
import { NgbdModalComponent } from '../modal/modal.component';
import { NgbNav, NgbNavItem } from '@ng-bootstrap/ng-bootstrap';
NgbNav
NgbNavItem
NgModule

@Component({
  selector: 'app-god',
  declarations: [
    AppComponent,
    GodComponent // Asegúrate de que el componente está declarado
  ],
  imports: [
    BrowserModule,
    NgbModule // Asegúrate de incluirlo aquí
  ],
  templateUrl: './god.component.html',
  styleUrls: ['./god.component.scss']
})
export class GodComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
