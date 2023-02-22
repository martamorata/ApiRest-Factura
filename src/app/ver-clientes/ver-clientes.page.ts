import { CrearClientePage } from './../crear-cliente/crear-cliente.page';
import { Cliente } from './../modelos/Cliente';
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ApiServiceProvider } from '../providers/api-service/api-service';

@Component({
  selector: 'app-ver-clientes',
  templateUrl: './ver-clientes.page.html',
  styleUrls: ['./ver-clientes.page.scss'],
})
export class VerClientesPage implements OnInit {
  
  // Array en el que se almacenan los clientes para mostrarlos por pantalla.
  public listaClientes = new Array<Cliente>();

  // Variable que almacena el cliente seleccionado.
  public clienteSeleccionado: Cliente;

  // Introduce los clientes buscados por el searchBar
  public clientesBuscados: Cliente[] = new Array;

  public clienteBuscado: string = "";

  constructor(private alertCtrl: AlertController, private modalCtrl: ModalController, public apiService: ApiServiceProvider) { }

  // Se inicializan todos los clientes del fichero .json
  ngOnInit() {
    this.apiService.getClientes()
      .then((clientes: Cliente[]) => {
        this.listaClientes = clientes;
      })
      .catch((error: string) => {
        console.log(error);
      });
  }

  // Método cancelar para salir del modal.
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  // Método que, al pulsar sobre un cliente, este es asignado a la variable clienteSeleccionado
  // Y a su vez devuelve el cliente a la página crear-factura.
  asignarCliente(c) {
    this.clienteSeleccionado = c;
    return this.modalCtrl.dismiss(this.clienteSeleccionado, 'confirm');
  }

  // Suma 1 a la página.
  changePage() {
    this.apiService.changePage();
  }

  // Método que abre la página crear-cliente.page.html
  // Permite almacenar los datos de un cliente para añadirlos a la lista.
  async openModal() {
    const modal = await this.modalCtrl.create({
      component: CrearClientePage
    });
    modal.present();

    modal.onDidDismiss().then((dataNuevoCliente) => {
      let nuevoCliente: Cliente = dataNuevoCliente['data'];

      if (nuevoCliente != null) {
        this.apiService.insertCliente(nuevoCliente)
          .then((c: Cliente) => {
            this.listaClientes.push(new Cliente(c.id, c.cliente));
          })
          .catch((error: string) => {
            console.log(error);
          });
      }
    });
    return await modal.present();
  } // End openModal()

  // Método utilizado en el searchBar para buscar un cliente.
  buscarCliente(): void {
    this.clientesBuscados = []
    for (let i=0; i < this.listaClientes.length; i++) {
     if (this.listaClientes[i].cliente.startsWith(this.clienteBuscado)) {
      this.clientesBuscados.push(this.listaClientes[i])
     } else {

     }
    }
  } // Fin buscarCliente()

}


