import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerClientesPage } from './ver-clientes.page';

const routes: Routes = [
  {
    path: '',
    component: VerClientesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerClientesPageRoutingModule {}
