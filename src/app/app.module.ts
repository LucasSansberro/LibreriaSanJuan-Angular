import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './components/admin/admin.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { FooterComponent } from './components/footer/footer.component';
import { MasVendidosComponent } from './components/home/components/mas-vendidos/mas-vendidos.component';
import { HomeComponent } from './components/home/home.component';
import { LibrosComponent } from './components/libros/libros.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DataService } from './services/data.service';
import { LibrosHomeComponent } from './components/home/components/libros-home/libros-home.component';
import { NavComponent } from './components/navbar/components/nav/nav.component';
import { OverlayCarritoComponent } from './components/navbar/components/overlay-carrito/overlay-carrito.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginModalComponent } from './components/navbar/components/login-modal/login-modal.component';
import { SesionService } from './services/sesion.service';
import { CarritoService } from './services/carrito.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LibrosComponent,
    ContactoComponent,
    AdminComponent,
    NavbarComponent,
    FooterComponent,
    MasVendidosComponent,
    LibrosHomeComponent,
    NavComponent,
    OverlayCarritoComponent,
    LoginModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SweetAlert2Module.forRoot(),
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [DataService, SesionService, CarritoService],
  bootstrap: [AppComponent],
})
export class AppModule {}
