import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin2',
  imports: [ReactiveFormsModule],
  templateUrl: './admin2.component.html',
  styleUrl: './admin2.component.css'
})

export class Admin2Component {
  productForm: FormGroup;
  selectedImage: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder, private router: Router) {
    this.productForm = this.fb.group({
      title: [''],
      description: [''],
      price: [''],
      image: [''],
      category: [''],
      manufactureDate: ['']
    });
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result;
        this.productForm.patchValue({ image: this.selectedImage });
      };
      reader.readAsDataURL(file);
    }
  }

  createProduct(event: Event): void {
    event.preventDefault();

    const submitter = (event as SubmitEvent).submitter as HTMLElement | null;

    if (!submitter) {
      return;
    }

    const { manufactureDate, title, description, price, image, category, ...rest } = this.productForm.value;

    if (!title || !description || !price || !category) {
      alert("Rellena los campos adecuadamente.");
      return;
    }

    const productData = { title, description, price, image, category, manufactureDate, ...rest };

    fetch('https://fakestoreapi.com/products', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData)
    })
      .then(res => res.json())
      .then(json => {
        console.log('Producto creado:', json);
        alert("Producto añadido correctamente");
        this.router.navigate(['/products-table']);
      })
      .catch(err => console.error('Error:', err));
  }
}