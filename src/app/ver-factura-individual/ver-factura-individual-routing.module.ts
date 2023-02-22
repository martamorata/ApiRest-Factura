import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerFacturaIndividualPage } from './ver-factura-individual.page';

const routes: Routes = [
  {
    path: '',
    component: VerFacturaIndividualPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerFacturaIndividualPageRoutingModule {}
