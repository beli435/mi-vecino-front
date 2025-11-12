import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-form',
  standalone: true,
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
  imports: [CommonModule, ReactiveFormsModule], // 👈 IMPORTANTE
})
export class ProductFormComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      quantity: ['', [Validators.required, Validators.min(1)]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const products = JSON.parse(localStorage.getItem('products') || '[]');
      products.push(this.form.value);
      localStorage.setItem('products', JSON.stringify(products));

      alert('✅ Producto guardado correctamente');
      this.router.navigate(['/products']);
    } else {
      alert('⚠️ Debes llenar todos los campos.');
    }
  }

  volver() {
    this.router.navigate(['/products']);
  }
}
