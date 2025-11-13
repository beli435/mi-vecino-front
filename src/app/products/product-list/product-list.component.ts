import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  imports: [CommonModule, CurrencyPipe], // 👈 IMPORTANTE
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private router: Router, private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.products = this.productService.getAll();
  }

  nuevoProducto() {
    this.router.navigate(['/products/new']);
  }

  editarProducto(id: string) {
    this.router.navigate(['/products', id, 'edit']);
  }

  eliminarProducto(id: string) {
    if (confirm('¿Eliminar este producto?')) {
      this.productService.delete(id);
      this.loadProducts();
    }
  }
}
