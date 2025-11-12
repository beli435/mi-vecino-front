import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  imports: [CommonModule, CurrencyPipe], // 👈 IMPORTANTE
})
export class ProductListComponent implements OnInit {
  products: any[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.products = JSON.parse(localStorage.getItem('products') || '[]');
  }

  nuevoProducto() {
    this.router.navigate(['/products/new']);
  }
}
