import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore'
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productsCollections: AngularFirestoreCollection<Product>;
  products: Observable<Product[]>;
  productDoc:AngularFirestoreDocument<Product>;

  constructor(private db:AngularFirestore) {
    this.productsCollections = this.db.collection('products');    
    this.products = this.productsCollections.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Product;
          data.id = a .payload.doc.id;
          console.log('constructor',data);
          return data;
        })
      })
    )
  }

  getProducts(){
    return this.products;
  }

  deleteProduct(product:Product){
    console.log('deleting', product.id);    
    this.productDoc = this.db.doc(`products/${product.id}`)
    this.productDoc.delete();
  }

  addProduct(product:Product){
    this.productsCollections.add(product);
  }

  updateProduct(product:Product){
    this.productDoc = this.db.doc(`products/${product.id}`)
    this.productDoc.update(product);
  }
}
