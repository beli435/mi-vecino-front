import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-form',
  standalone: true,
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
  imports: [CommonModule, ReactiveFormsModule], // 👈 IMPORTANTE
})
export class ProductFormComponent implements OnInit {
  form: FormGroup;
  productId: string | null = null;
  title = 'Agregar producto';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      quantity: ['', [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId) {
      this.title = 'Editar producto';
      const product = this.productService.getById(this.productId);
      if (product) {
        this.form.patchValue({
          name: product.name,
          price: product.price,
          quantity: product.quantity,
        });
      }
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      alert('⚠️ Debes llenar todos los campos.');
      return;
    }

    const { name, price, quantity } = this.form.value as Omit<Product, 'id'>;

    if (this.productId) {
      this.productService.update(this.productId, { name, price: Number(price), quantity: Number(quantity) });
      alert('✅ Producto actualizado');
    } else {
      this.productService.add({ name, price: Number(price), quantity: Number(quantity) });
      alert('✅ Producto guardado correctamente');
    }
    this.router.navigate(['/products']);
  }

  volver() {
    this.router.navigate(['/products']);
  }
}
