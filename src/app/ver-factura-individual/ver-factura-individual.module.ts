import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerFacturaIndividualPageRoutingModule } from './ver-factura-individual-routing.module';

import { VerFacturaIndividualPage } from './ver-factura-individual.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerFacturaIndividualPageRoutingModule
  ],
  declarations: [VerFacturaIndividualPage]
})
export class VerFacturaIndividualPageModule {}
