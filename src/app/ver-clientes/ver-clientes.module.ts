import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerClientesPageRoutingModule } from './ver-clientes-routing.module';

import { VerClientesPage } from './ver-clientes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerClientesPageRoutingModule
  ],
  declarations: [VerClientesPage]
})
export class VerClientesPageModule {}
