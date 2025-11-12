import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private router: Router) {}

  login() {
    if (this.username && this.password) {
      alert('Bienvenido ' + this.username + ' 👋');
      this.router.navigate(['/products']); // 👈 Aquí navega a productos
    } else {
      alert('Por favor, ingresa tus credenciales.');
    }
  }
}
