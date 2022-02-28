import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './dashboard/home/home.component';
import { NotificacionComponent } from './dashboard/notificacion/notificacion.component';
import { VehiclesComponent } from './dashboard/vehicles/vehicles.component';

const routes: Routes = [

{path: '', component:HomeComponent},
{ path: 'vehicles/:id', component:VehiclesComponent},
{ path: 'notificacion', component:NotificacionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
