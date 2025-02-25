import { Component, HostListener, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css'],
  imports: [CommonModule]
})
export class ProductsTableComponent implements OnInit {

  products: any[] = [];
  filteredProducts: any[] = [];
  searchControl = new FormControl('');
  activeMenu: number | null = null;

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      this.filteredProducts = data;
    });

    this.searchControl.valueChanges.pipe(
      debounceTime(300)
    ).subscribe((value) => {
      this.filterProducts(value ? value : "");
    });
  }

  onSearch(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.filterProducts(inputElement.value);
  }

  filterProducts(searchTerm: string) {
    if (!searchTerm.trim()) {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;

    if (!target.closest('.menu-container')) {
      this.activeMenu = null;
    }
  }

  toggleMenu(index: number): void {
    this.activeMenu = this.activeMenu === index ? null : index;
  }

  deleteProduct(index: number): void {
    const productId = this.filteredProducts[index].id;

    fetch(`https://fakestoreapi.com/products/${productId}`, {
      method: "DELETE",
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`Error al eliminar el producto (Código: ${res.status})`);
        }
        return res.json();
      })
      .then(() => {
        this.filteredProducts.splice(index, 1);
        this.activeMenu = null;
        console.log("BORRADO CORRECTO :)")
      })
      .catch(error => {
        console.error("Error eliminando el producto:", error);
      });
  }


  isAdmin2() {
    return this.authService.getRole() === 'admin2';
  }

  isAdmin1() {
    return this.authService.getRole() === 'admin1';
  }

  navigateToAdmin2() {
    this.router.navigate(['/admin2']);
  }


}
