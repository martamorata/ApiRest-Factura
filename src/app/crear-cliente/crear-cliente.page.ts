import { ApiServiceProvider } from './../providers/api-service/api-service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Cliente } from '../modelos/Cliente';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.page.html',
  styleUrls: ['./crear-cliente.page.scss'],
})
export class CrearClientePage implements OnInit {


  validations_form: FormGroup;
  cliente:Cliente;
  nuevoCliente:Cliente;

  constructor(public formBuilder: FormBuilder,
    public modalCtrl: ModalController, public apiService: ApiServiceProvider) { }

    // Formulario para crear un nuevo cliente.
  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      cliente: new FormControl('', Validators.compose([
        Validators.maxLength(50),
        Validators.minLength(1),
        Validators.pattern('^[a-z A-ZáéíóúÁÉÍÓÚ]+$'),
        Validators.required
      ]))
    });

  } // End onInit


  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  // onSubmit que crea el nuevo cliente y lo envía a la página anterior (ver-clientes).
  onSubmit(value:any) {
    this.nuevoCliente = new Cliente(0, value['cliente']);
    return this.modalCtrl.dismiss(this.nuevoCliente, 'confirm');
  }
}
