import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { HomeComponent } from './components/home/home.component';
import { LibrosComponent } from './components/libros/libros.component';

const routes: Routes = [
  { path: '', pathMatch: 'full' ,component: HomeComponent },
  { path: 'libros',  pathMatch: 'full', component: LibrosComponent },
  { path: 'contacto',  pathMatch: 'full', component: ContactoComponent },
  { path: 'admin',  pathMatch: 'full', component: AdminComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
