import { Injectable } from '@angular/core';
import { ApiService } from '../../core/service/api.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  // subject behavior to capture the changes in product id when any new or latest product id comes
  private single_product_id = new BehaviorSubject(null)
  current_product = this.single_product_id.asObservable();

  // this is a all api that wee have to use to build our application
  public user_url = "http://localhost:3000/user/";
  public product_url = "http://localhost:3000/products/";
  public order_url = "http://localhost:3000/orders/";

  constructor(private apiService:ApiService) { }

  // This api is use to retrive all products
  allProduct():Observable<any>{
    return this.apiService.get(this.product_url);
  }

  // this api is use to retrive product by there latest id its automatically update to all component that latest product_id
  quickBuyProduct(Product_id:any){
    this.single_product_id.next(Product_id);
  }

  // this api is use to retrive product based on api
  individualProduct(Product_id:any){
    return this.apiService.get(this.product_url+Product_id);
  }

  // this api is used to retrive product based on user id
  userDetails(User_id:any){
    return this.apiService.get(this.user_url+User_id);
  }

  // This api is used to upload or insert new order detail
  insertNewOrder(order_dto:any):Observable<any>{
    return this.apiService.post(this.order_url,order_dto);
  }

  // this api is iused to retrive all orders to showing on dashboard
  orderDashboardData():Observable<any>{
    return this.apiService.get(this.order_url);
  }

  // this api is used to retrive all product to showing on dashboard
  productDashboardData():Observable<any>{
    return this.apiService.get(this.product_url)
  }
  
}
