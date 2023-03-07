import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { HomeComponent } from './components/home/home.component';
import { LibrosComponent } from './components/libros/libros.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'libros', component: LibrosComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'admin', component: AdminComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
