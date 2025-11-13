import { Injectable } from '@angular/core';
import { Product } from '../products/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private storageKey = 'products';

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  private read(): Product[] {
    if (!this.isBrowser()) return [];
    try {
      const raw = localStorage.getItem(this.storageKey) || '[]';
      const data: any[] = JSON.parse(raw);
      // migrate missing ids
      let changed = false;
      const withIds: Product[] = data.map((p: any) => {
        if (!p.id) {
          changed = true;
          return { ...p, id: crypto.randomUUID?.() || String(Date.now() + Math.random()) } as Product;
        }
        return p as Product;
      });
      if (changed) localStorage.setItem(this.storageKey, JSON.stringify(withIds));
      return withIds;
    } catch {
      return [];
    }
  }

  private write(items: Product[]): void {
    if (!this.isBrowser()) return;
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }

  getAll(): Product[] {
    return this.read();
  }

  getById(id: string): Product | null {
    return this.read().find((p) => p.id === id) || null;
  }

  add(input: Omit<Product, 'id'>): Product {
    const items = this.read();
    const newItem: Product = {
      id: crypto.randomUUID?.() || String(Date.now()),
      ...input,
    };
    items.push(newItem);
    this.write(items);
    return newItem;
  }

  update(id: string, update: Omit<Product, 'id'>): void {
    const items = this.read();
    const idx = items.findIndex((p) => p.id === id);
    if (idx >= 0) {
      items[idx] = { id, ...update };
      this.write(items);
    }
  }

  delete(id: string): void {
    const items = this.read().filter((p) => p.id !== id);
    this.write(items);
  }
}
