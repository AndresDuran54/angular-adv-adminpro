import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';

//Mantemiento
import { UsuariosComponent } from './mantenimiento/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimiento/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimiento/medicos/medicos.component';
import { MedicoComponent } from './mantenimiento/medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { RolGuard } from '../guards/rol.guard';
import { RouterModule } from '@angular/router';

const childRoutes = [
  {path: '', component: DashboardComponent, data: { titulo: 'Dashboard' }},
  {path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressBar' }},
  {path: 'grafica1', component: Grafica1Component, data: { titulo: 'Gráfica #1' }},
  {path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes de cuenta'}},
  {path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' }},
  {path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' }},
  {path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil' }},
  //Busqueda
  {path: 'buscar/:termino', component: BusquedaComponent, data: { titulo: 'Busqueda #1' }},
  //Mantenimiento
  {path: 'usuarios', canActivate: [RolGuard], component: UsuariosComponent, data: { titulo: 'Usuarios' }},
  {path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Hospitales' }},
  {path: 'medicos', component: MedicosComponent, data: { titulo: 'Medicos' }},
  {path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Medico' }}
  //{path: '', redirectTo: '/dashboard', pathMatch: 'full'},
]

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule {

}
