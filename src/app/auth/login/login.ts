import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form: FormGroup;
  loading = false;
  error = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  submit() {
    if (this.form.invalid) return;

    const { usuario, password } = this.form.value;

    this.loading = true;
    setTimeout(() => {
      if (usuario === 'admin' && password === '123456') {
        this.router.navigate(['/productos']);
      } else {
        this.error = 'Credenciales incorrectas';
      }
      this.loading = false;
    }, 1000);
  }
}
