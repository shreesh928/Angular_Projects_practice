import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../../core/service/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public product_url = "http://localhost:3000/products/";

  constructor(private httpClient:HttpClient, private apiService:ApiService) { }

  // this is used to retrive all product
  allProduct():Observable<any>{
    return this.apiService.get(this.product_url);
  }

  // this is used to add product
  addNewProduct(product_dto:any):Observable<any>{
    return this.apiService.post(this.product_url, product_dto);
  }

  // this is used to retrive single product
  singleProduct(id:any){
    return this.apiService.get(this.product_url+id)
  }

  // this is used to update the product
  updateProduct(id:any,product_dto:any):Observable<any>{
    return this.apiService.put(this.product_url+id,product_dto);
  }

  // this is used to delete the product based on id
  deleteProduct(id:any):Observable<any>{
    return this.apiService.delete(this.product_url+id);
  } 
}
