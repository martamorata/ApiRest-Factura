import { ElementoLista } from './../modelos/ElementoLista';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-ver-factura-individual',
  templateUrl: './ver-factura-individual.page.html',
  styleUrls: ['./ver-factura-individual.page.scss'],
})
export class VerFacturaIndividualPage implements OnInit {

  elemento:ElementoLista;

  constructor(public activatedRoute: ActivatedRoute,
    public navCtrl: NavController) {
      this.activatedRoute.queryParams.subscribe(params => {
        this.elemento = JSON.parse(params["elemento"]);
        console.log(this.elemento.cliente);
      })
     }

  ngOnInit() {
  }

}
