import { VerClientesPage } from './../ver-clientes/ver-clientes.page';
import { HomePage } from './../home/home.page';
import { LineaDetalle } from './../modelos/LineaDetalle';
import { MostrarProductosComponent } from './../mostrar-productos/mostrar-productos.component';
import { Producto } from './../modelos/Producto';
import { Factura } from 'src/app/modelos/Factura';
import { Component, OnInit } from '@angular/core';
import { Cliente } from '../modelos/Cliente';
import { ApiServiceProvider } from '../providers/api-service/api-service';
import { ModalController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { HomePageModule } from '../home/home.module';


@Component({
  selector: 'app-crear-factura',
  templateUrl: './crear-factura.page.html',
  styleUrls: ['./crear-factura.page.scss'],
})
export class CrearFacturaPage implements OnInit {

  // Variable que recoge todos los clientes del fichero.
  public clientes = new Array<Cliente>();

  public nUnidades:number;

  // Variable que recoge los datos de los productos que se pide.
  public lineaDetalle = new Array<LineaDetalle>();

  public importeIva:number;
  public nuevaFactura: Factura;
  public clienteSeleccionado:Cliente;

  constructor(private apiService: ApiServiceProvider, public modalCtrl: ModalController) { }

  ngOnInit() {

  }

  // Método que se dirige a la página mostrar-productos en forma de Modal.
  // Recoge los datos que se introduzcan.
  // Se van añadiendo al array lineaDetalle.
  async openModal() {
    const modal = await this.modalCtrl.create({
      component: MostrarProductosComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.lineaDetalle.push(data)
      console.log(this.lineaDetalle)
    }
  }

  cancelar() {
    this.modalCtrl.dismiss();
  }

  // Método aceptar. Al pulsarlo se genera una nueva factura y se devuelve al Home
  // En el Home se añade la factura a la api-service.
  aceptar() {
    this.nuevaFactura = new Factura(0, this.clienteSeleccionado['cliente'], this.importeIva, this.lineaDetalle)
    return this.modalCtrl.dismiss(this.nuevaFactura, 'confirm');
  }


  // Método que se dirige a la página ver-clientes.page.html
  // Almacena el cliente que se cree en esa página en la variable clienteSeleccionado.
  async openModalClientes() {
    const modal = await this.modalCtrl.create({
      component: VerClientesPage
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.clienteSeleccionado = data;
    }
  }

}
