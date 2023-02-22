import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'crear-factura',
    loadChildren: () => import('./crear-factura/crear-factura.module').then( m => m.CrearFacturaPageModule)
  },
  {
    path: 'ver-clientes',
    loadChildren: () => import('./ver-clientes/ver-clientes.module').then( m => m.VerClientesPageModule)
  },
  {
    path: 'crear-cliente',
    loadChildren: () => import('./crear-cliente/crear-cliente.module').then( m => m.CrearClientePageModule)
  },
  {
    path: 'ver-factura-individual',
    loadChildren: () => import('./ver-factura-individual/ver-factura-individual.module').then( m => m.VerFacturaIndividualPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
