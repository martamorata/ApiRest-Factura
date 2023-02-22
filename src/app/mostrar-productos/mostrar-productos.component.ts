import { ApiServiceProvider } from './../providers/api-service/api-service';
import { Producto } from 'src/app/modelos/Producto';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LineaDetalle } from '../modelos/LineaDetalle';

@Component({
  selector: 'app-mostrar-productos',
  templateUrl: './mostrar-productos.component.html',
  styleUrls: ['./mostrar-productos.component.scss'],
})
export class MostrarProductosComponent implements OnInit {

  public productos = new Array<Producto>();
  public productoSeleccionado = Producto;
  public nUnidades:number;
  public importeTotal:number;
  public lineaDetalle:LineaDetalle;

  constructor(private modalCtrl: ModalController, public apiService: ApiServiceProvider) { }

  ngOnInit() {
    this.apiService.getProductos()
    .then((productos:Producto[]) => {
      this.productos = productos;
    })
    .catch((error:string) => {
      console.log(error);
    });
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    this.lineaDetalle = new LineaDetalle(this.productoSeleccionado['descripcion'], this.productoSeleccionado['importeUnitario'], this.nUnidades, this.importeTotal);
    return this.modalCtrl.dismiss(this.lineaDetalle, 'confirm');
  }

  // Obtiene el importe total de un producto por las unidades seleccionadas.
  importeTotalProducto() {
    this.importeTotal = this.nUnidades*this.productoSeleccionado['importeUnitario'];
  }

}
