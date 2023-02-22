import { CrearFacturaPage } from './../crear-factura/crear-factura.page';
import { Factura } from './../modelos/Factura';
import { Component, OnInit } from '@angular/core';
import { ApiServiceProvider } from '../providers/api-service/api-service';
import { ElementoLista } from '../modelos/ElementoLista';
import { LineaDetalle } from '../modelos/LineaDetalle';
import { NavController, ModalController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  facturas: Factura[];
  public lista: ElementoLista[] = new Array();

  constructor(private apiService: ApiServiceProvider, public modalController: ModalController, private navCtrl: NavController) {

  }

  // Método que llama a la petición GET de facturas, y añade a un array de ElementoLista los datos
  // Que se piden por pantalla.
  ngOnInit(): void {
    this.apiService.getFacturas()
      .then((facturas: Factura[]) => {
        this.facturas = facturas;
        this.lista = new Array();
        this.facturas.forEach((factura: Factura) => {
          let importeTotalSinIva: number = 0.0;

          //recorro todos los productos de la factura
          for (let i: number = 0; i < factura.productos.length; i++) {
            let lineaDetalle: LineaDetalle = factura.productos[i];
            importeTotalSinIva += lineaDetalle.importeUnitario * lineaDetalle.unidades;
          }//end_for

          let importeTotalConIva = importeTotalSinIva * (1 + factura.porcentajeIva / 100);
          let elementoLista = new ElementoLista(factura.id,
            factura.cliente,
            importeTotalConIva);
          this.lista.push(elementoLista);

        });
      })
      .catch((error: string) => {
        console.log(error);
      });
  } // end ngOnInit

  getFacturas() {
    return this.facturas;
  }

  // Modal que se dirige a la página que crea nuevas facturas: crear-factura.page.html
  public async nuevaFactura() {
    const modal = await this.modalController.create({
      component: CrearFacturaPage,
      componentProps: {
      }
    });

    // Recoge los datos enviados por la página y los añade con el método POST.
    // Añade también los datos necesarios a la lista de ElementoLista para que se muestren por pantalla.
    modal.onDidDismiss().then((dataNuevaFactura) => {
      let nuevaFactura: Factura = dataNuevaFactura['data'];

      if (nuevaFactura != null) {
        this.apiService.insertFactura(nuevaFactura)
          .then((factura: Factura) => {
            this.lista.push(new ElementoLista(factura.id, factura.cliente, factura.porcentajeIva))
            console.log(factura)
          })
          .catch((error: string) => {
            console.log(error);
          });
      }
    });
    return await modal.present();
  } // End nuevaFactura()


  // Abre la página ver-factura-individual.page.html que 
  // Mostrará los datos de cada factura por individual.
  irAFactura(elemento: ElementoLista) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        elemento: JSON.stringify(elemento)
      }
    };
    this.navCtrl.navigateForward('/ver-factura-individual', navigationExtras);
  } // Fin irAFactura





}
