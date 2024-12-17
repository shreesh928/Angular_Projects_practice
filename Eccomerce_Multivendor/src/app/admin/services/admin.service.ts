import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  // all api urls
  public user_url = "http://localhost:3000/user/";
  public product_url = "http://localhost:3000/products";
  public all_user = "http://localhost:3000/user/";


  constructor(private apiService:HttpClient) { }

  userDashboardData():Observable<any>{
    return this.apiService.get<any>(this.user_url);
  }

  productDashboardData():Observable<any>{
    return this.apiService.get<any>(this.product_url);
  }

  allUser():Observable<any>{
    return this.apiService.get<any>(this.all_user);
  }

  addUser(user_dto:any){
    return this.apiService.post(this.user_url, user_dto);
  }

  // get single user
  singleUser(user_id:any){
    return this.apiService.get(this.user_url+user_id);
  }


  // update the of individual user
  editUser(user_id:any, user_dto:any){
    return this.apiService.post(this.user_url+user_id, user_dto);
  }

  
  // delete user
  deleteUser(user_id:any){
    return this.apiService.delete(this.user_url+user_id)
  }

}
