import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  product = {} as Product;

  constructor(private productService:ProductService) { }

  ngOnInit(): void {
  }

  addProduct(){
    this.productService.addProduct(this.product);
    this.product = {} as Product;
  }

}
