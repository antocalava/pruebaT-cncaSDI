import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule]
})
export class DashboardComponent implements OnInit {

  products: any[] = [];
  cart: any[] = [];
  totalPrice: number = 0;
  totalQuantity = 0;
  categories: string[] = [];
  selectedCategory: string = '';

  constructor(private productService: ProductService) { }

  saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
    localStorage.setItem('totalPrice', JSON.stringify(Number(this.totalPrice.toFixed(2))));
    localStorage.setItem('totalQuantity', JSON.stringify(Number(this.totalQuantity)));
  }

  addToCart(product: any) {
    const existingItem = this.cart.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity++;
      existingItem.totalPrice = parseFloat((existingItem.quantity * product.price).toFixed(2));
      this.totalQuantity++;
    } else {
      this.cart.push({
        ...product,
        quantity: 1,
        totalPrice: parseFloat(product.price.toFixed(2))
      });
      this.totalQuantity++;
    }

    this.updateTotalPrice();
    this.saveCart();
  }

  removeFromCart(product: any) {
    const index = this.cart.findIndex(item => item.id === product.id);

    if (index !== -1) {
      if (this.cart[index].quantity > 1) {
        this.cart[index].quantity--;
        this.cart[index].totalPrice = parseFloat((this.cart[index].quantity * this.cart[index].price).toFixed(2));
        this.totalQuantity--;
      } else {
        this.cart.splice(index, 1);
        this.totalQuantity--;
      }
    }

    this.updateTotalPrice();
    this.saveCart();
  }

  updateTotalPrice() {
    this.totalPrice = this.cart.reduce((sum, item) => sum + item.totalPrice, 0);
    this.totalPrice = parseFloat(this.totalPrice.toFixed(2));
  }

  emptyCart() {
    if (this.totalPrice !== 0) {
      alert("Usted ha comprado " + this.totalQuantity + " productos. Y ha gastado " + this.totalPrice + " €.");
      this.cart = [];
      this.totalPrice = 0;
      this.totalQuantity = 0;
    }
  }

  extractCategories() {
    const uniqueCategories = new Set(this.products.map(product => product.category));
    this.categories = Array.from(uniqueCategories);
    console.log("CATEGORIES", this.categories);
  }

  filteredProducts() {
    if (!this.selectedCategory) {
      return this.products;
    }
    return this.products.filter(product => product.category === this.selectedCategory);
  }

  onCategoryChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedCategory = target.value;
  }

  ngOnInit() {
    const storedCart = localStorage.getItem('cart');
    const storedTotalPrice = localStorage.getItem('totalPrice');
    const storedTotalQuantity = localStorage.getItem('totalQuantity')

    if (storedCart) {
      this.cart = JSON.parse(storedCart);
    }

    if (storedTotalPrice) {
      let cleanedPrice = storedTotalPrice.trim();

      if (!isNaN(Number(cleanedPrice))) {
        this.totalPrice = parseFloat(Number(cleanedPrice).toFixed(2));
      } else {
        this.totalPrice = 0;
        console.warn("El valor de totalPrice en localStorage no es un número válido.");
      }
    } else {
      this.totalPrice = 0;
    }

    const cleanedQuantity = (storedTotalQuantity?.trim() || '0');

    if (!isNaN(Number(cleanedQuantity))) {
      this.totalQuantity = Math.max(0, parseInt(cleanedQuantity, 10));
    } else {
      this.totalQuantity = 0;
    }

    this.productService.getProducts().subscribe(data => {
      this.products = data;
      this.extractCategories();
    });
  }
}
