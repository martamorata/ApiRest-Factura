import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearFacturaPage } from './crear-factura.page';

const routes: Routes = [
  {
    path: '',
    component: CrearFacturaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearFacturaPageRoutingModule {}
