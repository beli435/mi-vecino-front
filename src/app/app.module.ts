import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <- correcto
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// componentes (ajusta las rutas si las tuyas son distintas)
import { LoginComponent } from './auth/login/login.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { AgregarProductoComponent } from './agregar-producto/agregar-producto.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, ProductListComponent, AgregarProductoComponent],
  imports: [
    BrowserModule, // importante para la app raíz
    FormsModule, // [(ngModel)] y formularios template-driven
    ReactiveFormsModule, // formGroup, formControl (formularios reactivos)
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
