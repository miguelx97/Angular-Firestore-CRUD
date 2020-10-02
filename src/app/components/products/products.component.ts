import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products = [];
  editingProduct: Product;
  editing: boolean = false;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      console.log(products);
      this.products = products;
    })
  }

  deleteProduct(product:Product){
    this.productService.deleteProduct(product);
  }

  editProduct(product:Product){
    this.editingProduct = product;
    this.editing = !this.editing;
  }

  updateProduct(){
    this.productService.updateProduct(this.editingProduct)
    this.editing = false;

  }

}
