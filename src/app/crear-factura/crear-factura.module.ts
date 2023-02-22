import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearFacturaPageRoutingModule } from './crear-factura-routing.module';

import { CrearFacturaPage } from './crear-factura.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearFacturaPageRoutingModule
  ],
  declarations: [CrearFacturaPage]
})
export class CrearFacturaPageModule {}
